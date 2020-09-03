var count = 10;
var io = setInterval(function() {
    console.log('Doing ' + (10-count).toString() );
    count--;
    if (count === 0) {
        console.log('Finished');
        clearInterval(io);
    }
}, 1000);