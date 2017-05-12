from formatAddress import origin, destination
import requests, json

# Get API key from file
with open ("distance-matrix-api-key.txt", "r") as keyfile:
    apiKey=keyfile.readlines()

# Make API call
url = 'https://maps.googleapis.com/maps/api/distancematrix/json'

duration_list = []
def getValue(departure_time):
    params = {
        'origins': origin,
        'destinations': destination,
        'departure_time': departure_time,
        'key': apiKey
    }

    response = requests.get(url=url, params=params)
    data = json.loads(response.text)

    # Parse json to retrieve duration in seconds
    duration = (data['rows'][0]['elements'][0]['duration'].get('value'))
    duration_list.append(duration)

    # Prints status response if not OK
    if response.status_code != 200:
        print(response)
