import {Suspense, useState} from "react";
import Helix from "./components/Helix";
import Player from "./components/Player";
import TestThree from "./TestThree";



function App() {

  const [displayPlayer, setDisplayPlayer] = useState(false)
  const [playerURL, setPlayerURL] = useState('https://www.youtube.com/embed/6zzzdwt3YOQ?si=qXpY1sTd9T_lGqhd')
  const [displayFooter, setDisplayFooter] = useState(true) //TODO finish implementation of footer for mobile

  const togglePlayer = (url) => {
    if (url !== undefined)
    {
      setPlayerURL(url)
    }
    setDisplayPlayer(!displayPlayer);
  }

  return (
      <div className="App flex flex-col h-full" >
        <header className="z-50 absolute top-0 w-full flex justify-between p-4">
          <div className="w-16 md:w-24">
            <div className="bg-red-nissin pb-3 md:pb-6 rounded-b-full flex justify-center items-center" >
              <span className="font-black text-white">Nissin</span>
            </div>
          </div>

          <div className="w-1/12 text-red-nissin text-lg flex gap-x-4 font-black justify-end">
            <i className="fa-solid fa-volume-xmark"></i>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </header>

        <main style={{flexGrow: 1}}>
          <div id="tube" style={{height: '100%'}}>
            {displayPlayer && <Player url={playerURL} togglePlayer={togglePlayer}/>}
            {/*{<TestCSS3D />}*/}
            {!displayPlayer && <Helix togglePlayer={togglePlayer}/>}
            {/*<TestThree />*/}
          </div>
        </main>

        <footer className="h-full md:h-auto w-full bg-white absolute z-40 bottom-0 hidden md:block">
          <ul className="h-full md:h-auto flex flex-col items-center gap-y-6 md:flex-row md:gap-x-6 md:pl-6 pt-32 md:pt-0">
            <li><a href="/jp/news/">ニュース</a></li>
            <li><a href="/jp/products/">製品</a></li>
            <li><a href="/jp/customer/">お客さま窓口</a></li>
            <li><a href="/jp/ir/">IR</a></li>
            <li><a href="/jp/sustainability/">サステナビリティ</a></li>
            <li><a href="/jp/about/">日清食品グループ</a></li>
            <li><a href="/jp/about/recruit/" target="_blank" className="ns_header-nav-a-recruit">リクルート</a></li>
            <li><a href="https://store.nissin.com/" target="_blank"
                   className="ns_header-nav-a-online">オンラインストア</a></li>
            <li className="banner"><a href="http://sports.nissin.com/" target="_blank"> <img
                src="//images.ctfassets.net/yuquvgfpub5v/GE2BIRKZ7jy9BSU1R5ehG/0f1130105889abea084c47506bcb66b9/banner_footer.png"
                width="130" height="26"/> </a></li>
          </ul>
          <div className="h-24 w-24 bg-red-nissin text-white absolute bottom-0 mb-12 left-1/2 -translate-x-1/2 text-2xl flex justify-center items-center uppercase md:hidden cursor-pointer">{ displayFooter ? 'X' : 'Menu'}</div>
        </footer>
      </div>
  );
}

export default App;
