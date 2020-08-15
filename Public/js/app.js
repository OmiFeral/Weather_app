
const WeatherForm = document.querySelector('form');
const Message = document.querySelector('#Message-1');
const Error  = document.querySelector('#Error');


WeatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const Location = document.querySelector('input');

    if(Location.value !== null)
    {
        fetch('http://localhost:3000/weather?address='+Location.value).then((response) => {
            response.json().then((data) => {
                if(data.error)
                   Error.textContent =  data.error;
                else
                    Message.textContent = data.Message.Message;
            })
        })

        
    }
    else
    {
        console.log('Please enter location');
    }
    
})

