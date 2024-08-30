// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Video } from 'expo-av';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Icon from "react-native-vector-icons/Ionicons";

// import Pdf from 'react-native-pdf';
// import colors from '../../../components/colors';

// const FilePreview = ({ fileUri, fileType, visible, onClose }) => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     //const { fileUri, fileType } = route.params;  On récupère les paramètres de la route
//     const [comment, setComment] = useState('');


//     const renderFilePreview = () => {
//         switch (fileType) {
//             case 'image':
//                 return <Image source={{ uri: fileUri }} style={styles.previewImage} resizeMode="contain" />;

//             case 'video':
//                 return (
//                     // <Video
//                     //     source={{ uri: fileUri }}
//                     //     rate={1.0}
//                     //     volume={1.0}
//                     //     resizeMode="contain"
//                     //     controls={true}
//                     //     style={styles.previewVideo}
//                     // />
//                     <Video
//                         source={{ uri: fileUri }}
//                         rate={1.0}
//                         volume={1.0}
//                         isMuted={false}
//                         resizeMode="contain"
//                         shouldPlay={false}
//                         useNativeControls
//                         style={styles.previewVideo}
//                     />
//                 );
//             case 'document':
//                 return <Pdf source={{ uri: fileUri }} style={styles.previewPdf} />;
//             default:
//                 return <Text>Aperçu non disponible</Text>;
//         }
//     };

//     const handleSend = () => {
//         // Ici, on implémente la logique d'envoi du fichier avec le commentaire
//         console.log('Fichier envoyé avec le commentaire:', comment);
//         // On redirige vers la page d'accueil avec les informations du fichier envoyé et le commentaire
//         //navigation.navigate('ChatScreen', { fileUri: fileUri, comment: comment, fileType: fileType });
//     };

//     return (
//         <Modal
//             viv
//         >
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                         <Icon name="arrow-back" size={24} color={colors.pureWhite} />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Aperçu du fichier</Text>
//                 </View>
//                 <ScrollView contentContainerStyle={styles.scrollContent}>
//                     <View style={styles.previewContainer}>
//                         {renderFilePreview()}
//                     </View>

//                     <TextInput
//                         style={styles.commentInput}
//                         placeholder="Ajouter un commentaire..."
//                         value={comment}
//                         onChangeText={setComment}
//                         multiline
//                     />
//                 </ScrollView>
//                 <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//                     <Text style={styles.sendButtonText}>Envoyer</Text>
//                 </TouchableOpacity>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.pureWhite,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         backgroundColor: colors.primary,
//     },
//     backButton: {
//         marginRight: 16,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: colors.pureWhite,
//     },
//     scrollContent: {
//         flexGrow: 1,
//     },
//     previewContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     previewImage: {
//         width: '100%',
//         height: 300,
//     },
//     previewVideo: {
//         width: '100%',
//         height: 300,
//     },
//     previewPdf: {
//         flex: 1,
//         width: '100%',
//         height: 500,
//     },
//     fileInfoContainer: {
//         padding: 16,
//         backgroundColor: colors.lightGrey,
//         marginBottom: 16,
//     },
//     fileInfoText: {
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     commentInput: {
//         borderWidth: 1,
//         borderColor: colors.primary,
//         borderRadius: 8,
//         padding: 12,
//         margin: 16,
//         minHeight: 100,
//     },
//     sendButton: {
//         backgroundColor: colors.primary,
//         padding: 16,
//         margin: 16,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     sendButtonText: {
//         color: colors.pureWhite,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default FilePreview
import { View, Text } from 'react-native'
import React from 'react'

const FilePreview = () => {
    return (
        <View>
            <Text>FilePreview</Text>
        </View>
    )
}

export default FilePreview