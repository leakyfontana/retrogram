//logic used from https://codepen.io/rebosante/pen/eENYBv
const scrollTo = (element: HTMLElement, to: number, duration: number) => {
    var start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;
    
    const animateScroll = () => {        
        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

const easeInOutQuad = (t:number, b:number, c:number, d:number) => {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export default scrollTo;