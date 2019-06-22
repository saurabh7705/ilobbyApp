import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Privacy extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Privacy Policy"
      }
  };

  render() {
  	return (
  		<ScrollView contentContainerStyle={styles.container}>
  			<Text>kOMMUNITY is owned by the legal entity who registered the app. At kOMMUNITY, we
value your trust &amp; respect your privacy. This Privacy Policy provides you with details
about the manner in which your data is collected, stored &amp; used by us. You are advised
to read this Privacy Policy carefully. By visiting kOMMUNITY website/applications you
expressly give us consent to use &amp; disclose your personal information in accordance
with this Privacy Policy.</Text>

        <Text style={styles.margin}>Note: Our privacy policy may change at any time without prior notification. To make sure
that you are aware of any changes, kindly review the policy periodically.</Text>

        <Text style={styles.subheading}>General</Text>
        <Text>We will not sell, share or rent your personal information to any 3rd party or use your
email address/mobile number for unsolicited emails and/or SMS. Any emails and/or
SMS sent by kOMMUNITY will only be in connection with the provision of agreed
services and this Privacy Policy. Periodically, we may reveal general statistical
information about kOMMUNITY &amp; its users, such as number of visitors, number of
feedbacks suggested etc.</Text>

        <Text style={styles.subheading}>Personal Information</Text>
        <Text>Personal Information means and includes all information that can be linked to a specific
individual or to identify any individual, such as name, profile image, telephone number,
email ID, information about your mobile phone and any details that may have been
voluntarily provide by the user in connection with availing any of the services/vendors
on kOMMUNITY. When you browse through kOMMUNITY, we may collect information
regarding the domain and host from which you access the internet, the Internet Protocol
[IP] address of the computer or Internet service provider [ISP] you are using, and
anonymous site statistical data.</Text>

        <Text style={styles.subheading}>Use of Personal Information</Text>
        <Text>We may occasionally ask you to complete optional online surveys. These surveys may
ask you for contact information and demographic information (like zip code, age,
gender, etc.). We use this data to customize your experience at kOMMUNITY, providing
you with content that we think you might be interested in and to display content
according to your preferences.</Text>

        <Text style={styles.subheading}>Cookies</Text>
        <Text>A cookie is a small piece of information stored by a web server on a web browser so it
can be later read back from that browser. kOMMUNITY uses cookie and tracking
technology depending on the features offered. No personal information will be collected
via cookies and other tracking technology; however, if you previously provided
personally identifiable information, cookies may be tied to such information. Aggregate
cookie and tracking information may be shared with third parties.</Text>

        <Text style={styles.subheading}>Links to Other Sites</Text>
        <Text>Our site links to other websites that may collect personally identifiable information about
you. kOMMUNITY is not responsible for the privacy practices or the content of those
linked websites.</Text>


        <Text style={styles.subheading}>Security</Text>
        <Text>kOMMUNITY has stringent security measures in place to protect the loss, misuse, and
alteration of the information under our control. Whenever you change or access your
account information, we offer the use of a secure server. Once your information is in our
possession we adhere to strict security guidelines, protecting it against unauthorized
access.</Text>

        <Text style={styles.subheading}>Consent</Text>
        <Text>By using kOMMUNITY and/or by providing your information, you consent to the
collection and use of the information you disclose on kOMMUNITY in accordance with
this Privacy Policy, including but not limited to your consent for sharing your information
as per this privacy policy. Specifically “feedback” (Complaint/Suggestion/Compliment)
shared by you in the form of text, image and/or audio will be shared with selected
organization. kOMMUNITY never modifies your feedback content and will be shared “as
it is” with the organization.</Text>
  		</ScrollView>
  	);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16
  },
  subheading: {
    marginTop: 16,
    marginBottom: 4,
    fontFamily: 'sans-serif-medium'
  },
  margin: {
    marginTop: 16
  }
});
