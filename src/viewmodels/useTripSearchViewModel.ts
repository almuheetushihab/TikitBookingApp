import { useState, useEffect } from 'react';
import { Trip, Station, TransportType } from '../models';
import { SAMPLE_TRIPS, STATIONS } from '../services/ApiService';

export const useTripSearchViewModel = () => {
    const [transportType, setTransportType] = useState<TransportType>('bus');
    const [fromStation, setFromStation] = useState<string>('');
    const [toStation, setToStation] = useState<string>('');
    const [journeyDate, setJourneyDate] = useState<string>('2026-06-30');
    const [passengerCount, setPassengerCount] = useState<number>(1);
    const [searchResults, setSearchResults] = useState<Trip[]>([]);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // Set default stations when transport mode changes
    useEffect(() => {
        const list = STATIONS[transportType];
        if (list && list.length >= 2) {
            setFromStation(list[0].id);
            setToStation(list[1].id);
        }
        // Reset search results on transport type change
        setSearchResults([]);
        setHasSearched(false);
    }, [transportType]);

    const handleSearchTrips = () => {
        // Filter based on transport type, from and to
        const filtered = SAMPLE_TRIPS.filter(trip => {
            return trip.type === transportType &&
                trip.from.id === fromStation &&
                trip.to.id === toStation;
        });

        setSearchResults(filtered);
        setHasSearched(true);
    };

    const handleSwapStations = () => {
        const temp = fromStation;
        setFromStation(toStation);
        setToStation(temp);
    };

    return {
        // State
        transportType,
        fromStation,
        toStation,
        journeyDate,
        passengerCount,
        searchResults,
        hasSearched,
        stationOptions: STATIONS[transportType] || [],

        // Actions
        setTransportType,
        setFromStation,
        setToStation,
        setJourneyDate,
        setPassengerCount,
        handleSearchTrips,
        handleSwapStations,
    };
};
