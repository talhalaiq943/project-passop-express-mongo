import { useState } from 'react'

import './App.css'


import Manager from './components/manager.jsx'
function App() {

  return (
    <>
      <div>
        {/* <div style={{ width: "100vw", height: '100vh', position: 'relative' }}>
          <Bg
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={30}
            noise={0.0}
            blindCount={50}
            blindMinWidth={50}
            spotlightRadius={0.9}
            spotlightSoftness={0.1}
            spotlightOpacity={0.8}
            mouseDampening={0.3}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div> */}
        <Manager />
        
      </div>
    </>
  )
}

export default App
