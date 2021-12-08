import './App.scss';
import Web3 from "web3";
import pickRandom from 'pick-random';
import nftMintArray from "./nfts.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {useEffect,useState} from "react";
import {loadContract} from "./loadContract"
import detectEthereumProvider from '@metamask/detect-provider';
function App() {
  const [nftData,setNftData]=useState();
  const [contractData,setContractData]=useState();
  const [amount,setAmount]=useState(1);
  const [loading,setLoading]=useState(false);

  const connectHandler=async()=>{
    try{
      const accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider=await detectEthereumProvider();
      const userWallet=accounts[0];
       const contract=await loadContract("BSCSquidPunks",provider);
      const totalMint=await contract.totalMint();
      const maxMint=await contract.maxMint();
      setContractData({totalMint:totalMint.words[0].toString(),maxMint:maxMint.words[0].toString()});
      alert(userWallet)
      setNftData({
        provider,
        userWallet,
        contract,
      })
    }
    catch(err){
      alert(err)
    }

  }
  const mintHandler=async()=>{
    if(nftData?.userWallet){
      const toMint=pickRandom(nftMintArray,{count: amount});
      try{
        setLoading(true)
        const tx=await nftData.contract.awardItem(nftData.userWallet,toMint,{from:nftData.userWallet,value:(amount*Web3.utils.toWei('0.1', 'ether'))})
        if(tx.tx){
          toast.success('Your NFT`\'s minted successfully.', {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
            });
        }
        setLoading(false);
      }
       catch(err){
        toast.error('Someting went wrong!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false);
      }
    }
    else{
      toast.error('Please connect with your wallet first!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
   
  }
  return (
 <>
  <ToastContainer />
 <div className="container">
 <nav className="mb-5">
  <div className="w-100 d-flex justify-content-between nav-main">
    <div className="d-flex nav-items">
    <div className="m-2 nav-item nav-active">MINT</div>
    <div className="m-2 nav-item"><a href="#features">ROADMAP</a></div>
    <div className="m-2 nav-item"><a href="#faq">FAQ</a></div>
    <div className="m-2 nav-item"><a href="#reward">REWARD</a></div>
    </div>
    <div className="d-flex align-items-center">
    <div className=""><i class="fab fa-twitter fa-2x m-2"></i></div>
    <div className=""><i class="fab fa-discord fa-2x m-2"></i></div>
    <div className=""><i class="fab fa-medium-m fa-2x m-2"></i></div> 
    <div class="pixel2 desc-text w-300 px-small" onClick={connectHandler}>{nftData?.userWallet?"CONNECTED":"CONNECT"}</div>
    </div>
  </div>
 </nav>
    <div className="d-flex flex-wrap">
    <div className="card-body d-flex flex-column align-items-center justify-content-center desc-text">
    <div className="mb-4">BSC<span className="text-red">Squid</span>Punks</div>
    <div className="desc-text-sub mb-2"><span className="count-desc">9,999</span> unique squid punks on Binance Smart Chain.</div>
    <div className="desc-text-sub mb-4">We are making squid game more fun with squid punks.</div>
    <div>
      <div onClick={()=>{amount>1&&setAmount(amount-1)}} class="pixel2 desc-text px-small me-3">-</div>
      <div class="pixel2 desc-text px-small">{amount}</div>
      <div onClick={()=>{amount<100&&setAmount(amount+1)}} class="pixel2 desc-text px-small ms-3">+</div>
      <div class="pixel2 desc-text px-small back-pnk ms-3">{amount/10} BNB</div>
      </div>
    <button disabled={(contractData?.maxMint-contractData?.totalMint)<=0} class="pixel2 desc-text w-300" onClick={mintHandler}>{loading?<div class="spinner-border" role="status"></div>:<>{(contractData?.maxMint-contractData?.totalMint)<=0?"SOLD OUT":"MINT"}</>}</button>
    </div>
    <img className="nft-images" width="400px" src="./nfts.gif"/>  
    </div>

    <div className="features" id="features">
      <h1 className="mb-5">ROADMAP</h1>
      <h3 className="text-red">Id irure commodo aliquip ut nostrud veniam consectetur in eu eu</h3>
<div class="timeline">
  
  <h2 class="timeline__item timeline__item--year">1985</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Born</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2003</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Graduated High School</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2004</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Started at Fox Valley Technical College (FVTC) in an Electrical Engineering program</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2006</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Changed at FVTC to Web Design & Development program</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2007</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Web Design Internship</h3>
    <p class="timeline__blurb">started internship at company 1.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2008</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">IT Internship</h3>
    <p class="timeline__blurb">Started internship at company 2</p>
  </div>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Got Married</h3>
  </div>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Application Engineer</h3>
    <p class="timeline__blurb">Started web design/dev job at company 2.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2012</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">First Child</h3>
    <p class="timeline__blurb">Spouse and I welcomed our first daughter.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2015</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Second Child</h3>
    <p class="timeline__blurb">Spouse and I welcomed our second daughter.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2016</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Lead Application Engineer</h3>
    <p class="timeline__blurb">Promotion to mid-level role.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2018</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Aerial/Circus Arts</h3>
    <p class="timeline__blurb">Started taking classes to learn aerial silks, hoop, and hammock.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2019</h2>
  
</div>


    </div>



    <div className="faq" id="faq">
      <h1 className="mb-5 mt-5">FAQ</h1>
      <div className="d-flex lister">
        <div>
        <h3 className="text-yellow">Id irure commodo aliquip ut nostrud veniam consectetur in eu eu?</h3>
      <p className="me-5">
        Incididunt id aliquip est esse cupidatat eiusmod laboris dolor dolore. Nulla mollit consectetur veniam et elit fugiat laborum reprehenderit. Veniam eu proident mollit ex exercitation fugiat Lorem veniam incididunt aute ad veniam. Dolor magna amet et incididunt.
      </p>

      <h3 className="text-yellow">Id irure commodo aliquip ut nostrud veniam consectetur in eu eu?</h3>
      <p className="me-5">
        Incididunt id aliquip est esse cupidatat eiusmod laboris dolor dolore. Nulla mollit consectetur veniam et elit fugiat laborum reprehenderit. Veniam eu proident mollit ex exercitation fugiat Lorem veniam incididunt aute ad veniam. Dolor magna amet et incididunt.
      </p>

      <h3 className="text-yellow">Id irure commodo aliquip ut nostrud veniam consectetur in eu eu?</h3>
      <p className="me-5">
        Incididunt id aliquip est esse cupidatat eiusmod laboris dolor dolore. Nulla mollit consectetur veniam et elit fugiat laborum reprehenderit. Veniam eu proident mollit ex exercitation fugiat Lorem veniam incididunt aute ad veniam. Dolor magna amet et incididunt.
      </p>
        </div>
     
      <img className="nft-images" width="200px" height="280px" src="/nft/3.png"/>
      </div>
     
    </div>



    <div className="features" id="reward">
      <h1 className="mb-5">REWARD</h1>
      <h3 className="text-red">Id irure commodo aliquip ut nostrud veniam consectetur in eu eu</h3>
<div class="timeline">
  
  <h2 class="timeline__item timeline__item--year">1985</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Born</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2003</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Graduated High School</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2004</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Started at Fox Valley Technical College (FVTC) in an Electrical Engineering program</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2006</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Changed at FVTC to Web Design & Development program</h3>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2007</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Web Design Internship</h3>
    <p class="timeline__blurb">started internship at company 1.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2008</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">IT Internship</h3>
    <p class="timeline__blurb">Started internship at company 2</p>
  </div>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Got Married</h3>
  </div>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Application Engineer</h3>
    <p class="timeline__blurb">Started web design/dev job at company 2.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2012</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">First Child</h3>
    <p class="timeline__blurb">Spouse and I welcomed our first daughter.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2015</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Second Child</h3>
    <p class="timeline__blurb">Spouse and I welcomed our second daughter.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2016</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Lead Application Engineer</h3>
    <p class="timeline__blurb">Promotion to mid-level role.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2018</h2>
  
  <div class="timeline__item">
    <h3 class="timeline__title">Aerial/Circus Arts</h3>
    <p class="timeline__blurb">Started taking classes to learn aerial silks, hoop, and hammock.</p>
  </div>
  
  <h2 class="timeline__item timeline__item--year">2019</h2>
  
</div>


    </div>














    <div className="footer-text mt-5">BSC<span className="text-red">Squid</span>Punks</div>
 </div>

 
 
 </>
  );
}

export default App;
