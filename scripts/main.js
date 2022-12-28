var stopwatch_elem = document.getElementById("stopwatch");
var instruction_times = [15000, 45000, 100000, 110000, 130000, 140000, 160000]
// var instruction_times = [1000, 2000, 3000, 4000, 5000, 6000, 7000] // Testing

// Stopwatch class
var Stopwatch = function(elem, options) {

    var timer = createTimer(),
        offset,
        clock,
        interval;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
        return document.createElement("span");
    }
  
    function start() {
        if (!interval) {
          offset = Date.now();
          interval = setInterval(update, options.delay);
        }
    }
  
    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
  
    function reset() {
        clock = 0;
        render(0);
    }
  
    function update() {
        clock += delta();
        render();
    }
  
    function render() {
        time = new Date(clock).toISOString().slice(14, 22)
        timer.innerHTML = time;
    }
  
    function delta() {
        var now = Date.now(),
        d = now - offset;
    
        offset = now;
        return d;
    }
  
    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
    this.clock = clock
  };
  

// Trigger on stopwatch times
const waitUntil = (condition, checkInterval=100) => {
    return new Promise(resolve => {
        let interval = setInterval(() => {
            if (!condition()) return;
            clearInterval(interval);
            resolve();
        }, checkInterval)
    })
}

async function start(elem, elem_next, delay) {
    let flag = false;
    
    setTimeout(()=> {flag=true}, delay); // set flag=true after delay ms
    await waitUntil(() => flag==true ); // wait
    
    console.log(elem)
    if (elem !== null) {
        elem.classList.remove('current-instruction')
        elem.classList.add('completed-instruction')
    }
    if (elem_next !== null) {
        elem_next.classList.add('current-instruction')
    }
}

// Start the stopwatch on load
window.addEventListener('load', () => {
	stopwatch = new Stopwatch(stopwatch_elem);
    stopwatch.start()

    // Get all li elements
    let instructions = document.getElementsByTagName('li')
    instructions[0].classList.add('current-instruction')
    for (let i = 0; i < instructions.length; i++) {
        if (i == 0) {
            start(instructions[i], instructions[i+1], instruction_times[i])
        } else if (i < instructions.length - 1){
            start(instructions[i], instructions[i+1], instruction_times[i])
        } else {
            start(instructions[i], null, instruction_times[i])
        }
    }

});


