import {Application, Graphics} from 'pixi.js';
/**
 * @author kozakluke@gmail.com
 */
class Main
{
    private static animationId:number;
    private static last:number;
    private static delta:number;
    
    private app:Application;
    private updateHandler:Function;
    
    constructor()
    {
        window.onload = this.onLoad.bind(this);
    }
    
    private onLoad()
    {
        const app = this.app = new Application({autoResize: false});
        document.body.appendChild(app.view);
        
        const shape = new Graphics();
        app.stage.addChild(shape);
        shape.beginFill(0xFFFF00, 1);
        shape.drawRect(0, 0, 20, 20);
        shape.endFill();
        
        document.addEventListener('visibilitychange', this.onVisibility.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(this.onResize.bind(this), 0);
        
        var delta = 0;
        (this.updateHandler = function update(now:number)
        {
            Main.animationId = requestAnimationFrame(update);
            delta      = now - Main.last;
            Main.last  = now;
            Main.delta = delta * 0.06;
            
            app.render();
        })(performance.now());
    }
    
    private onVisibility()
    {
        if (document['visibilityState'] == 'hidden')
            cancelAnimationFrame(Main.animationId);
        else if (document['visibilityState'] == 'visible')
            this.updateHandler(Main.last = performance.now());
    }
    
    private onResize()
    {
        this.app.view.style.width  = window.innerWidth  + 'px';
        this.app.view.style.height = window.innerHeight + 'px';
        this.app.renderer.resize(window.innerWidth  * window.devicePixelRatio || 1,
                                 window.innerHeight * window.devicePixelRatio || 1);
        this.app.render();
    }
}

new Main();
