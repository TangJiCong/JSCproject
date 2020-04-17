

import Script from 'react-load-script'

function Background(){
    
    return(
        <div>
          
            {/* <canvas id="fireworks" className="fireworks"></canvas> */}
            {/* <div id="particles-js" className="particlesJs"></div> */}
            <Script url="/static/js/shubiao.js" />
            <Script url="/static/js/particles.js" />
        </div>
    )
}

export default Background