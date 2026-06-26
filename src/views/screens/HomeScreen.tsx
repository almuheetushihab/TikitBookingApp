import React from 'react';
import { View, Text, Button, FlatList, SafeAreaView } from 'react-native';
import { useTripSearchViewModel } from '../../viewmodels/useTripSearchViewModel';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
    const {
        transportType,
        fromStation,
        toStation,
        searchResults,
        hasSearched,
        stationOptions,
        setTransportType,
        setFromStation,
        setToStation,
        handleSearchTrips,
        handleSwapStations,
    } = useTripSearchViewModel();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1 p-4">
                <Text className="text-2xl font-bold text-center mb-5">Ticket Booking App</Text>

                {/* Transport Type Picker */}
                <View className="bg-white mb-3 rounded-lg">
                    <Picker
                        selectedValue={transportType}
                        onValueChange={(itemValue) => setTransportType(itemValue)}
                    >
                        <Picker.Item label="Bus" value="bus" />
                        <Picker.Item label="Train" value="train" />
                        <Picker.Item label="Flight" value="flight" />
                    </Picker>
                </View>

                {/* From Station */}
                <Text className="text-base font-medium mt-2">From:</Text>
                <View className="bg-white mb-3 rounded-lg">
                    <Picker
                        selectedValue={fromStation}
                        onValueChange={(itemValue) => setFromStation(itemValue)}
                    >
                        {stationOptions.map(station => (
                            <Picker.Item key={station.id} label={`${station.city} - ${station.name}`} value={station.id} />
                        ))}
                    </Picker>
                </View>

                <Button title="Swap Stations" onPress={handleSwapStations} />

                {/* To Station */}
                <Text className="text-base font-medium mt-2">To:</Text>
                <View className="bg-white mb-3 rounded-lg">
                    <Picker
                        selectedValue={toStation}
                        onValueChange={(itemValue) => setToStation(itemValue)}
                    >
                        {stationOptions.map(station => (
                            <Picker.Item key={station.id} label={`${station.city} - ${station.name}`} value={station.id} />
                        ))}
                    </Picker>
                </View>

                <View className="mt-4">
                    <Button title="Search Trips" onPress={handleSearchTrips} />
                </View>

                {/* Search Results */}
                {hasSearched && (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View className="bg-white p-4 my-2 rounded-lg border border-gray-200">
                                <Text className="text-sm font-bold">{item.operatorName}</Text>
                                <Text className="text-sm">{item.from.city} to {item.to.city}</Text>
                                <Text className="text-sm font-semibold">Price: ${item.priceUSD}</Text>
                            </View>
                        )}
                        ListEmptyComponent={<Text className="text-center mt-5 text-base text-gray-500">No trips found for this route.</Text>}
                        className="mt-5"
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
