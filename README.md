The app works based on Google Maps API. It takes the origin and destination as arguments and gives the shortest duration in traffic for the mode driving . The api checks for the shortest duration every 10 minutes upto 8 times and gives the one with the lowest duration


<strong>Pre-requisite:</strong>

1.Install mongodb 

2.Start the mongodb server using the command "Mongod"

3.Valid Google Maps API key

Steps :

Install dependences -- // npm install

Use the command  node time.js <originstring> < Destinationstrng>  to get the shortest duration // 
