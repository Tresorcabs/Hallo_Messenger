import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';
import colors from './colors';

function ProgressCircle({ completedTasks, totalTasks }) {
    const progress = (completedTasks / totalTasks) * 100; // Calculer le pourcentage de progression

    return (
        <View style={styles.container}>
            <CircularProgress
                size={110} // Taille du cercle
                width={14} // Épaisseur du cercle
                backgroundWidth={15}
                percentage={progress}
                donutColor={colors.primary} // Couleur du cercle de progression (complétion)
                blankColor={colors.secondary_200} // Couleur du cercle de non-completion
                lineCap="round" // Forme des extrémités de la ligne
                rotation={0} // Rotation du cercle
                arcSweepAngle={360} // Angle de balayage de l'arc
            >
                {/* Texte pour afficher le pourcentage au centre */}
                <Text style={styles.text}>{Math.round(progress)}%</Text>
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
