import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextStyle
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { getTestID } from '../modules/test';

export interface HeaderButton {
  icon: string;
  disabled?: boolean;
  counter?: number;
  onPress: () => void;
  nativeID?: string;
  buttonStyle?: StyleProp<TextStyle>;
}

export interface HeaderProperties {
  title: string;
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
  nativeID?: string;
}

export class Header extends React.Component<HeaderProperties> {
  static defaultProps = {
    leftButtonType: 'menu'
  };

  static height = isTablet() ? 65 : 50;

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      header: {
        backgroundColor: theme.backgroundColor3,
        height: isTablet() ? 65 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title: {
        color: theme.textColor4,
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 22 : 18,
        marginHorizontal: 10,
        flexShrink: 1
      },
      button: {
        padding: isTablet() ? 14 : 10
      },
      counterContainer: {
        position: 'absolute',
        backgroundColor: theme.counterBackgroundColor,
        height: isTablet() ? 20 : 15,
        width: isTablet() ? 20 : 15,
        top: 5,
        left: 18,
        borderRadius: 50
      },
      counterText: {
        textAlign: 'center',
        color: theme.counterTextColor,
        fontSize: isTablet() ? 15 : 10
      }
    });

    return styles;
  };

  renderButton = (button: HeaderButton, type: 'left' | 'right') => {
    const styles = this.getStyles();
    const theme = getTheme();

    const icon = (
      <>
        <FontAwesome
          nativeID={button.nativeID}
          testID={getTestID(button.nativeID)}
          name={button.icon}
          size={isTablet() ? 30 : 20}
          color={button.disabled ? theme.textColor1 : theme.textColor4}
          // @ts-ignore : The component uses a different version of typing
          style={button.buttonStyle}
        />
        {button.counter ? (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{button.counter}</Text>
          </View>
        ) : null}
      </>
    );

    const style = [
      styles.button,
      type === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    ];

    if (button.disabled) {
      return <View style={style}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={button.onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  };

  renderButtonInvisible = (type: 'left' | 'right') => {
    const styles = this.getStyles();

    const style = [
      styles.button,
      type === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    ];

    return <View style={style} />;
  };

  render() {
    const { title, leftButton, rightButton, nativeID } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.header}>
        {leftButton
          ? this.renderButton(leftButton, 'left')
          : this.renderButtonInvisible('left')}
        <Text
          nativeID={nativeID}
          testID={getTestID(nativeID)}
          style={styles.title}
        >
          {title}
        </Text>
        {rightButton
          ? this.renderButton(rightButton, 'right')
          : this.renderButtonInvisible('right')}
      </View>
    );
  }
}
