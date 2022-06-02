import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "web3uikit";
import { Web3Provider } from "../../contexts/connect.context";
import Title from "../../components/shared/Title";
import CardContainerTemplate from "../../components/shared/card/CardContainerTemplate";
import CardListTemplate from "../../components/shared/card/CardListTemplate";
import { NFT_CONTRACTS as nftContractAddress, NFT_DEFAULT_CHAIN } from "../../utils/constants";

const Market = () => {
  const history = useNavigate();

  const { chain, account, ConnectedWallet, nftContractMarketplace, isReload, getMarketplaceList, listMarketplace, ChangeChain, checkConnectChain, isConnectChain } = useContext(Web3Provider);

  useEffect(() => {
    if (account && nftContractMarketplace) {
      getMarketplaceList();
    }
    checkConnectChain();
  }, [account, isReload, nftContractMarketplace]);

  const handleClickName = (id) => {
    history(`/market/detail/${id}`);
  };

  const handleClickAction = (id) => {
    console.log(id);
  };

  const onChangeNetwork = () => {
    ChangeChain(NFT_DEFAULT_CHAIN);
  };

  return (
    <div className="w-full flex flex-col">
      <Title text={"Marketplace"} />

      <div className="h-full flex gap-x-4 lg:gap-x-8 justify-center">

        {!account ? (
          <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
            <div className="">
              <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={ConnectedWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (

          !isConnectChain ? (
            <div className="w-full lg:w-1/2 flex-auto py-8 px-8 text-center">
              <div className="">
                <button type="button" className="w-full md:w-96 px-10 py-4 btn-home" onClick={onChangeNetwork}>
                  Switch to Ropsten
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <CardContainerTemplate
                padding="py-8 px-8"
                margin="my-8"
              >
                <div className="flex flex-col">
                  <div className="grid md:grid-cols-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {listMarketplace.loading ? (<div className="col-span-4 mx-auto">
                      <Loading
                        fontSize={20}
                        size={100}
                        spinnerColor="#fff"
                        text="Loading...."
                      /></div>) :
                      (listMarketplace?.list.length > 0) ? listMarketplace.list.map((item, key) => {
                        return (<div className="w-full rounded overflow-hidden shadow-md hover:shadow-xl bg-[#292929] relative group" key={key} >
                          <CardListTemplate
                            id={item.edition}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            rarity={'Common'}
                            chain={nftContractAddress[chain]?.ShortLabel}
                            owner={item.owner}
                            textAction={'Buy'}
                            onClick={() => handleClickName(item.edition)}
                            onClickAction={() => handleClickAction(item.edition)}
                          />
                        </div>
                        );
                      }) : (<h5 className="text-center text-2xl col-span-4 text-gray-200">Marketplace List No Result...</h5>)
                    }
                  </div>
                </div>
              </CardContainerTemplate>
            </div>
          )
        )}

      </div>

    </div >
  );
};

export default Market;