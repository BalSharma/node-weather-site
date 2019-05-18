console.log('client side javascript....');

// request function in node 2nd argument is function but fetch is 
// different. We use then() method on the ruturn value on the fetch
// then we provide callback function in then(() => {}) we want to run.
// we get response access at this point. Inside function we do whatever
// want do wiht response object.

/* fetch('http://puzzle.mead.io/puzzle')
    .then((res) => {
        // following function is run when json data has arrived.
        res.json().then((data) => {
            console.log(data);
        });
    }); 
*/


/* fetch('http://localhost:3000/view?address=Kathmandu')
    .then((res) => {
        res.json().then((data) => {            
            if (data.error) {
                console.log(data.error);
            }
            else {
                console.log(data.location);
                console.log(data.Data.current);
                console.log(data.Data.rain);
            }
        });
    }); */

// get access form element. get a javascript represenstion of form.
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-one');
const msgTwo = document.querySelector('#msg-two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msgOne.textContent = 'Loading.......';
    msgTwo.textContent = '';
    const location = search.value;
    if (location) {
        fetch('http://localhost:3000/view?address=' + location)
            .then((res) => {
                res.json().then((data) => {
                    if (data.error) {
                        // console.log(data.error);
                        msgOne.textContent = data.error;
                    }
                    else {
                        // console.log(data.location);
                        // console.log(data.Data.current);
                        // console.log(data.Data.rain);
                        msgOne.textContent = data.location;
                        msgTwo.textContent = data.Data.current +
                            '  ' + data.Data.rain;
                    }
                });
            });
    }
    else {
        // console.log('Must provide address');
        msgOne.textContent = 'Must provide address';
    }
});
