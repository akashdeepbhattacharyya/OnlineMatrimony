import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Oswald-Bold',
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
  },
  signupText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 22,
    color: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,
    height: 70,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 10,
    paddingLeft: 20,
  },
  inputIcon: {
    marginLeft: 25,
  },
  input: {
    flex: 1,
    color: '#000000',
    paddingVertical: 10,
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  greeting: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 40,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
  },
  hello: {
    color: '#ff4d4d',
  },
  checkboxWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkboxText: {
    color: '#fff',
    fontSize: 13,
    flexShrink: 1,
    fontFamily: 'Roboto-Regular',
    paddingLeft: 20,
  },
  checked: {
    backgroundColor: '#f55',
    borderColor: '#f55',
  },
  otpButton: {
    backgroundColor: '#F74D4D',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    height: 70,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  divider: {
    height: 1, // Set the height of the line
    width: '40%', // Adjust width as needed
    backgroundColor: '#ccc', // Set the color of the line
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  socialButton: {
    borderRadius: 100,
  },
  socialIcon: {
    width: 85,
    height: 85,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    maxWidth: 335,
    gap: 10,
  },
  signupLink: {
    color: '#F74D4D',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  textWrapper: {
    flexDirection: 'row', // Aligns the texts horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  dashedDivider: {
    fontSize: 18,
    color: '#fff', // Color of the text 'or'
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1,
  },
});
