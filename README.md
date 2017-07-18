The app works based on Google Maps API. It takes the origin and destination as arguments and gives the shortest duration in traffic for the mode driving . The api checks for the shortest duration in traffic every 10 minutes upto 8 times and gives the one with the lowest duration

The app is based on ES6 promises and runs on Asynchronous Javascript

<strong>Pre-requisite:</strong>

1.Install Node and MongoDB 

2.Valid Google Maps API key

<strong>Steps :</strong>

Install dependences -- // npm install

Use the command  node time.js <originstring> < Destinationstrng>  to get the shortest duration // 
