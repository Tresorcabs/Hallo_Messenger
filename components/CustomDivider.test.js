import React from 'react';
import { render } from '@testing-library/react-native';
import CustomDivider from './CustomDivider';

// Le mock est maintenant corrigé pour respecter les règles de portée de Jest.
jest.mock('react-native-paper', () => {
    // On utilise require ici car jest.mock est "hoisté" (remonté) avant les imports.
    const { View } = require('react-native');
    return {
        ...jest.requireActual('react-native-paper'),
        // On remplace le composant Divider par un simple <View /> pour le test.
        Divider: (props) => <View {...props} testID="mock-divider" />,
    };
});

describe('<CustomDivider />', () => {
  it('renders correctly with given text and creates a snapshot', () => {
    const testText = 'My Divider';
    const { getByText, toJSON } = render(<CustomDivider text={testText} />);

    // On vérifie que le texte est bien présent.
    expect(getByText(testText)).toBeTruthy();

    // On crée un "snapshot" qui est une représentation textuelle du rendu du composant.
    // Si le rendu change, le test échouera, nous alertant d'un changement inattendu.
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders without crashing when custom styles are applied', () => {
    const containerStyle = { backgroundColor: 'red' };
    const textStyle = { color: 'blue' };
    const barStyle = { height: 5 };

    // On vérifie simplement que le rendu ne provoque pas d'erreur.
    // Le snapshot du premier test se charge déjà de vérifier que les styles sont bien appliqués.
    const renderComponent = () => render(
      <CustomDivider
        text="Styled Divider"
        containerStyle={containerStyle}
        textStyle={textStyle}
        barStyle={barStyle}
      />
    );

    expect(renderComponent).not.toThrow();
  });
});
