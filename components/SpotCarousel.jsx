import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from './colors';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSpotContext } from '../Contexts/spotProvider';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SpotCarousel = ({ spots, spotViews, onClose }) => {

    const navigation = useNavigation();
    const { setSpotVisualizerVisible, spotVisualizerVisible } = useSpotContext();

    const translateX = useSharedValue(0);
    const currentIndex = useSharedValue(0);
    const timer = useRef(null);

    const goToNextSpot = () => { // fonction pour aller au prochain spot avec une animation
        if (currentIndex.value < spots.length - 1) {
            currentIndex.value++;
            translateX.value = withTiming(-SCREEN_WIDTH * currentIndex.value);
            startTimer();
        }
    };

    const goToPreviousSpot = () => { // fonction pour aller au spot precedent avec une animation
        if (currentIndex.value > 0) {
            currentIndex.value--;
            translateX.value = withTiming(-SCREEN_WIDTH * currentIndex.value);
            startTimer();
        }
    };

    const startTimer = () => { // fonction pour lancer le timer 
        clearTimeout(timer.current); // ici on supprime le timer car on va commencer un nouveau
        const currentSpot = spots[currentIndex.value]; // on récupère le spot courant
        timer.current = setTimeout(() => { // on crée le timer
            goToNextSpot(); // on appelle la fonction pour aller au prochain spot
        }, currentSpot.time); // on calcule le temps afin de lancer le timer
    };

    useEffect(() => { // ici on démarre le timer
        startTimer(); // on appelle la fonction pour lancer le timer
        return () => clearTimeout(timer.current); // ici on arrête le timer
    }, []);

    const panGesture = Gesture.Pan() // gestion du swipe pour aller au prochain spot
        .activeOffsetX([-10, 10]) // on active le swipe horizontal entre -10 et 10 pixels de l'axe X afin de pouvoir aller au prochain spot
        .onUpdate((event) => { // on met a jour la position du swipe
            translateX.value = event.translationX - SCREEN_WIDTH * currentIndex.value; // on met a jour la position du swipe
        })
        .onEnd((event) => {
            if (Math.abs(event.velocityX) > 500) { // on vérifie si le swipe est long 
                if (event.velocityX > 0) { // on vérifie si le swipe est vers la droite
                    runOnJS(goToPreviousSpot)();
                } else {
                    runOnJS(goToNextSpot)();
                }
            } else {
                translateX.value = withTiming(-SCREEN_WIDTH * currentIndex.value);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const closeVisualizer = () => {
        console.log(spotVisualizerVisible)
        setSpotVisualizerVisible(!spotVisualizerVisible);
    }

    return (
        <View style={styles.container}>

            <GestureDetector gesture={panGesture}>

                <Animated.View style={[styles.carousel, animatedStyle]}>
                    {spots.map((spot, index) => (
                        <View key={index} style={styles.slide}>

                            { /* Render your spot content here */
                                spot.type === "text" ? (



                                    <View style={styles.centeredView}>
                                        <View
                                            placeholderTextColor={spots.textColor}
                                            style={[styles.modalView,
                                            { backgroundColor: spot.bgColor }]}
                                        >

                                            <StatusBar style="light" backgroundColor={spot.bgColor} />

                                            <Text style={[styles.textSpotStyle, { color: spot.textColor }]}>{spot.text}</Text>

                                            {/** Close Button */}
                                            <TouchableOpacity
                                                style={styles.closeButton}
                                                onPress={closeVisualizer}
                                            >
                                                <Icon name="arrow-back" size={25} color={colors.pureWhite} />
                                            </TouchableOpacity>
                                        </View>




                                        {/** Actions View */}
                                        <View style={styles.actionView} >

                                            {/** Nombre de vues du spot  */}
                                            <View style={styles.addCommentView}>
                                                <Icon name="eye" color={colors.pureWhite} size={25} />
                                                <Text style={styles.spotViewsNumber}>{spotViews} </Text>

                                            </View>
                                        </View>
                                    </View>
                                )

                                    :

                                    (<Image
                                        source={{ uri: spot.photo }}
                                        style={styles.imageSpot}
                                    />)}
                        </View>


                    ))}
                </Animated.View>
            </GestureDetector>
            <TouchableOpacity style={styles.leftButton} onPress={goToPreviousSpot} />
            <TouchableOpacity style={styles.rightButton} onPress={goToNextSpot} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
    },
    carousel: {
        flexDirection: 'row',
        height: '100%',
    },
    slide: {
        width: SCREEN_WIDTH,
        height: '100%',
        backgroundColor: "red"
    },
    leftButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH / 2,
    },
    rightButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH / 2,
    },

    textSpotStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageSpot: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "100%",
        flex: 1,
        placeholderColor: colors.pureWhite,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: colors.glassBlackBtn,
        borderRadius: 20,
        padding: 10,
        marginLeft: 10,
        elevation: 2

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    actionView: {
        backgroundColor: colors.glassBlackBtn,
        height: 100,
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    sendView: {
        position: "absolute",
        bottom: 15,
        right: 20,
    },
    spotViewsNumber: {
        color: colors.pureWhite,
        fontSize: 20,
        textAlign: "center",
    },
    changeBgView: {
        position: "absolute",
        bottom: 15,
        left: 20,
    },


    spotPhoto: {
        position: 'static',
        width: "100%",
        flex: 1,
    },
    addCommentTextInput: {
        backgroundColor: colors.glassBlackBtn,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 25,
        color: colors.pureWhite,
        width: 350,
        maxHeight: 70,
        elevation: 2
    },
    sendCommentButton: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 15,
        elevation: 2
    },
    addCommentActionView: {
        backgroundColor: colors.smokeBlack,
        height: 80,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});

export default SpotCarousel;