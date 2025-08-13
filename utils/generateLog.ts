import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import type { GeminiProductRecommendation } from './types';

const LOG_KEY = 'recommendation_log';

export const logRecommendation = async (
    query: string,
    recommendation: GeminiProductRecommendation
) => {
    try {
        const existingLog = await AsyncStorage.getItem(LOG_KEY);
        const logArray = existingLog ? JSON.parse(existingLog) : [];

        logArray.push({
            timestamp: new Date().toISOString(),
            query,
            recommendation,
        });

        await AsyncStorage.setItem(LOG_KEY, JSON.stringify(logArray));
        console.log('Recommendation logged.');


        if (Platform.OS === 'web') {
            downloadRecommendationLog();
        } else {
            exportLogToFile();
        }
    } catch (err) {
        console.error(' Failed to log recommendation:', err);
    }
};

export const getRecommendationLog = async () => {
    try {
        const log = await AsyncStorage.getItem(LOG_KEY);
        return log ? JSON.parse(log) : [];
    } catch (err) {
        console.error(' Failed to read recommendation log:', err);
        return [];
    }
};


const FILE_PATH = FileSystem.documentDirectory + 'recommendation_log.json';

export const exportLogToFile = async () => {
    try {
        const log = await AsyncStorage.getItem('recommendation_log');
        const logArray = log ? JSON.parse(log) : [];

        await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(logArray, null, 2));

        await Sharing.shareAsync(FILE_PATH);
    } catch (error) {
        console.error('Error exporting JSON file:', error);
    }
};

export const downloadRecommendationLog = async () => {
    try {
        const log = await AsyncStorage.getItem('recommendation_log');
        const logArray = log ? JSON.parse(log) : [];

        const blob = new Blob([JSON.stringify(logArray, null, 2)], {
            type: 'application/json',
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'recommendations_log.json';
        link.click();

        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Failed to export log:', err);
    }
};