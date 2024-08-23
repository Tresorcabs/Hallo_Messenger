import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';
import { useNavigation } from '@react-navigation/native';
import SpotSetterComponent from './SpotSetterComponent';

export default function CameraComponent({ enabled }) {
    const navigation = useNavigation();

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraVisible, setCameraVisible] = useState(true);
    const cameraRef = useRef(null);

    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [selectedSpotType, setSelectedSpotType] = useState(null);


    const [modalVisible, setModalVisible] = useState(false);

    const openSpotModal = (type, uri) => {
        setSelectedSpotType(type);
        setCapturedPhoto(uri);
        setModalVisible(true);
    };


    const toggleCamera = () => {
        setCameraVisible(!cameraVisible);
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // Fonction pour capturer une photo et l'enregistrer


    const takePicture = async () => {

        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current?.takePictureAsync({ quality: 0.5, base64: true });

                if (photo) {
                    setCameraVisible(false);
                    openSpotModal("photo", photo.uri);
                }
                else {
                    setCapturedPhoto(null);
                }
            }
            catch (error) {
                console.log("Une erreur s'est produite lors de la prise de photo :", error);
            }
        }


    };


    /** Ici, on affiche la caméra si cameraVisible est true */

    if (cameraVisible == enabled) {
        return (

            <View style={styles.container}>

                <CameraView ref={cameraRef} style={styles.camera} facing={facing}>

                    <View style={styles.buttonContainer}>

                        {/** Bouton de fermeture de la caméra */}
                        <TouchableOpacity style={styles.closeCameraButton} onPress={toggleCamera}>
                            <Icon name="close" size={25} color={colors.primary_bold} />
                        </TouchableOpacity>


                        {/** Bouton de capture */}
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        </TouchableOpacity>

                        {/** Bouton de changement de face de la caméra */}
                        <TouchableOpacity style={styles.toggleFacingButton} onPress={toggleCameraFacing}>
                            <Icon name="camera-reverse" size={30} color={colors.primary_bold} />
                        </TouchableOpacity>

                    </View>
                </CameraView>

                {/** Modal de paramétrage du spot */}
                <SpotSetterComponent
                    onClose={() => setModalVisible(false)}
                    spotType={selectedSpotType}
                    spotMedia={capturedPhoto}
                    visible={modalVisible}
                />
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingVertical: 54,
        paddingHorizontal: 20,
    },
    toggleFacingButton: {
        padding: 15,
        borderRadius: 100,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.secondary_btn_bg,
        marginRight: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    closeCameraButton: {
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: colors.secondary_btn_bg,
    },
    captureButton: {
        padding: 40,
        borderRadius: 100,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.secondary_btn_bg,
        borderWidth: 8,
        borderColor: colors.primary_200,
    }
});
