import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FolderTree, Code, Sparkles, Rocket, Cpu, Layers, Copy, Check, ExternalLink } from 'lucide-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { MVVM_CODE_TEMPLATES, REACT_NATIVE_MVVM_PROJECT_STRUCTURE } from '../services/ApiService';

// Define colors to avoid Tailwind classes on unsupported components
const colors = {
    sky600: '#0284c7',
    sky400: '#38bdf8',
    slate500: '#64748b',
    slate400: '#94a3b8',
    emerald400: '#34d399',
};

interface RNGuideProps {
    language: 'en' | 'bn';
}

const RNGuide = ({ language }: RNGuideProps) => {
    const [activeTab, setActiveTab] = useState<'structure' | 'code' | 'resources'>('structure');
    const [activeCodeFile, setActiveCodeFile] = useState<'model' | 'viewmodel' | 'view' | 'service'>('viewmodel');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getCodeSnippet = () => {
        return MVVM_CODE_TEMPLATES[activeCodeFile];
    };

    const TabButton = ({ tabName, currentTab, onPress, title, icon: Icon }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center gap-2 pb-3 px-4 border-b-2 ${
                currentTab === tabName ? 'border-sky-500' : 'border-transparent'
            }`}
        >
            <Icon color={currentTab === tabName ? colors.sky600 : colors.slate500} size={16} />
            <Text className={`text-sm font-semibold ${
                currentTab === tabName ? 'text-sky-600 font-bold' : 'text-slate-500'
            }`}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView className="bg-white dark:bg-slate-900 rounded-2xl p-6">
            {/* Title section */}
            <View className="mb-8">
                <View className="self-start flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950 mb-2">
                    <Cpu color={colors.sky600} size={14} />
                    <Text className="text-xs font-semibold text-sky-600 dark:text-sky-400">Architecture Hub</Text>
                </View>
                <Text className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                    {language === 'bn' ? 'রিয়্যাক্ট নেটিভ MVVM আর্কিটেকচার গাইড' : 'React Native MVVM Architecture Guide'}
                </Text>
                <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {language === 'bn'
                        ? 'আপনার টিকিট বুকিং অ্যাপটি কীভাবে প্রফেশনাল আর্কিটেকচারে তৈরি করবেন তার সম্পূর্ণ নির্দেশিকা'
                        : 'Complete structural blueprint to construct a production-ready mobile app'}
                </Text>
            </View>

            {/* Guide Nav */}
            <View className="flex-row border-b border-slate-100 dark:border-slate-800 mb-6">
                <TabButton tabName="structure" currentTab={activeTab} onPress={() => setActiveTab('structure')} title={language === 'bn' ? 'প্রোজেক্ট স্ট্রাকচার' : 'Project Structure'} icon={FolderTree} />
                <TabButton tabName="code" currentTab={activeTab} onPress={() => setActiveTab('code')} title={language === 'bn' ? 'কোড টেমপ্লেট' : 'Code Templates'} icon={Code} />
                <TabButton tabName="resources" currentTab={activeTab} onPress={() => setActiveTab('resources')} title={language === 'bn' ? 'রিসোর্স' : 'Resources'} icon={Rocket} />
            </View>

            {/* Content Area */}
            {activeTab === 'structure' && (
                <View>
                    <View className="bg-slate-950 p-5 rounded-xl font-mono text-xs border border-slate-800">
                        <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-slate-800">
                            <Text className="text-slate-400 font-sans">🗂️ React Native Folder Structure</Text>
                            <TouchableOpacity
                                onPress={() => copyToClipboard(REACT_NATIVE_MVVM_PROJECT_STRUCTURE)}
                                className="flex-row items-center gap-1"
                            >
                                {copied ? <Check size={14} color={colors.emerald400} /> : <Copy size={14} color={colors.slate400} />}
                                <Text className="text-xs text-slate-400">{copied ? 'Copied' : 'Copy'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-slate-300">{REACT_NATIVE_MVVM_PROJECT_STRUCTURE.trim()}</Text>
                    </View>
                    <View className="mt-4 space-y-4">
                        <Text className="text-lg font-bold text-slate-800 dark:text-slate-100">
                            <Layers size={20} color={colors.sky500} />
                            {language === 'bn' ? 'কেন MVVM আর্কিটেকচার?' : 'Why MVVM?'}
                        </Text>
                        {/* ... other content ... */}
                    </View>
                </View>
            )}
            {/* Other tabs content */}
        </ScrollView>
    );
};

export default RNGuide;
