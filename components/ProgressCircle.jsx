import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';

function ProgressCircle({ completedTasks, totalTasks }) {
    const progress = (completedTasks / totalTasks) * 100; // Calculer le pourcentage de progression

    return (
        <View style={styles.container}>
            <CircularProgress
                size={150} // Taille du cercle
                width={15} // Épaisseur du cercle
                backgroundWidth={15}
                fill={progress} // Remplir en fonction du pourcentage de progression
                tintColor="#00e0ff" // Couleur du cercle de progression (complétion)
                backgroundColor="#3d5875" // Couleur du cercle de non-completion
                lineCap="round" // Forme des extrémités de la ligne
                rotation={0} // Rotation du cercle
                arcSweepAngle={360} // Angle de balayage de l'arc
            >
                {/* Texte pour afficher le pourcentage au centre */}
                {() => (
                    <Text style={styles.text}>{Math.round(progress)}%</Text>
                )}
            </CircularProgress>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        position: 'absolute', // Positionnement absolu pour centrer le texte
    },
});

export default ProgressCircle;
