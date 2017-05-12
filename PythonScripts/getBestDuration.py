import calendar, time
import getDuration
import sys

def main():
    departure_times = [] #key
    durations = [] #value

    # Retrieve duration time for every 10 minutes from now to 3 hours
    for i in range(0,10800,600):
        # round to the nearest tenth minutes
        currentTime = calendar.timegm(time.gmtime()) + i
        nearestTen = currentTime - (currentTime % 600)
        nearestTen = nearestTen + 600
        departure_times.append(nearestTen) #key
        # Get values
        getDuration.getValue(nearestTen)

    durations = getDuration.duration_list

    # Make dictionary
    dict = {}
    for i in range(0,18):
        dict[departure_times[i]] = durations[i]

    print(dict)

if __name__ == '__main__':
    main()
