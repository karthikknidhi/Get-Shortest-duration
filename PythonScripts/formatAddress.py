import re

# Hi Karthik - Change these to parse data from MongoDB
with open ("addresses.txt", "r") as myfile:
    addresses=myfile.readlines()

# Format addresses
addresses = [re.sub(' ', '+', item) for item in addresses]
addresses = [re.sub('\r?\n', '', item) for item in addresses]

# Set origin and destination based on retrieved addresses
origin = addresses[0]
destination = addresses[1]
