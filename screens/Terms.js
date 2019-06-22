import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Terms extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Terms & Conditions"
      }
  };

  render() {
  	return (
  		<ScrollView contentContainerStyle={styles.container}>
  			<Text>kOMMUNITY a mobile application developed and operated by legal entity under whom
the app is registered, hereafter known as “owner”. Owner grants you a limited license to
use the kOMMUNITY app subject to Terms of Use. By downloading and using the
KOMMUNITY app, you consent to these Terms of Use, as they may be updated from
time to time. For the purpose of these Terms of Use, wherever the context so requires,
“you” or “your” shall mean any natural or legal person who visits the Application and/or
transacts business on the Application and/or uses the Services by providing registration
information. The terms “kOMMUNITY”, “Application”, “we”, “us”, “our” shall mean the
Owner.</Text>
        <Text style={styles.subheading}>Your Account and Registration</Text>
        <Text>You will be required to register on the Application and store certain information prior to
the completion of any transaction on the Application. This registration will be done only
via a Signing In into your google account.</Text>

        <Text style={styles.margin}>Use of the Application is available only to persons who can form legally binding
contracts under the applicable contract law of the country of residence of the user.
Persons who are “incompetent to contract” includes minors, un-discharged insolvents
etc. are not eligible to use the Application. If you are a minor i.e. under the age of 18
years, you shall not register as a user of the Application and shall not transact on or use
the Application. As a minor if you wish to use or transact on the Application, such use or
transaction may be made by your legal guardian or parents.</Text>
        <Text style={styles.margin}>The Company reserves the right to terminate your membership and / or refuse to
provide you with access to the Application if it is brought to the Company’s notice or if it
is discovered that you are under the age of 18 years. You must keep your account
details up to date at all times including through provision of a valid and working email
address. You will be responsible for all the activities that occur under your account. You
may not sell or otherwise transfer your Application account to another person or entity.</Text>


        <Text style={styles.margin}>To register onto the Application, you will have to provide your Personal Information
(being such information that identifies, relates to or describes you, or which is capable
of being associated with you) including your mobile number and email address.</Text>
        <Text style={styles.margin}>Registration is only a one-time process and if you have previously registered, you shall
login / sign to remain active. Registration on the Application is free for all users.</Text>

        <Text style={styles.subheading}>Privacy Statement</Text>
        <Text>You understand that through your use of the Application or any software, services or
application programming interfaces available on or through the Application, including in
user forums or blogs or accessed via the Application, you consent to the collection,
storage, sharing and use by us or any of our affiliates, of Personal Information collected
from you. You agree that any such personal information may be viewed by others. You
understand and acknowledge that if you post personal information online that is
accessible to public, you may receive unsolicited messages from other parties in return
and the Company will not be responsible for the use or misuse of such information by third parties. We expressly disclaim any legal liability, whether civil, criminal, pertaining
to the content of, security of, or rights in, any part of such information. You have the
right to control your Personal Information and except as set out in these</Text>
        <Text style={styles.margin}>Terms of Use or in the privacy policy of the Company, we will not disclose your
Personal Information unless we have your permission or unless we are required to or
permitted to do so under applicable laws.</Text>
        <Text style={styles.subheading}>Rights in Content</Text>
        <Text>The kOMMUNITY app helps you to report your local issues to appropriate authorities
using proper media. You grant the owner a perpetual, non-exclusive, transferable,
royalty-free, worldwide, unlimited license to exercise all intellectual property rights in the
User Content, including, without limitation, to use, reproduce, make derivative works
from, and communicate the User Content to third parties. Owner may, at its discretion,
use the User Content in its marketing and promotional materials, such as on its
websites and social media profiles, or in its printed marketing collateral.</Text>
        <Text style={styles.margin}>Owner may sublicense its rights to the User Content to other parties.</Text>
        <Text style={styles.margin}>You represent that you have all necessary permissions to provide the User Content,
and to grant to Owner he rights granted in these Terms of Use. Unless otherwise
specified, all data, text, logos, other content and software contained in the Aino app
which are not User Content (collectively the Materials) are owned or licensed by Owner
and are protected by intellectual property and other laws. In particular, the Owner
trademark is owned by Owner or its licensors. Other company and product names
appearing on the Owner app may be trademarks of their respective owners.</Text>
        <Text style={styles.subheading}>License Restrictions</Text>
        <Text>You may access and use the kOMMUNITY app and the Materials only for your own
personal and non-commercial use. Except as expressly authorized by Owner in writing,
or to the extent expressly permitted by law, you may not reproduce, download, create
derivative works from, communicate to the public or otherwise use the Owner app or the
Materials for any other purpose.</Text>
        <Text style={styles.margin}>In using the kOMMUNITY app and the Materials, you must not do any of the following:</Text>
        <Text>share any content which is defamatory, pornographic, obscene, offensive, hateful, or
which incites or contains violence, or which otherwise does not comply with these
Terms of Use;</Text>
        <Text>bully, intimidate, harass, upset, embarrass, alarm or annoy any other person;</Text>
        <Text>transmit, or procure the sending of, any spam or other unsolicited or unauthorized
advertising or promotional material for commercial purposes;</Text>
        <Text>introduce any virus, trojan horse, worm, spyware, malware or any other code that is
intended to disable, limit, restrict, disrupt or provide unauthorized access, or frame the
kOMMUNITY app or the Materials or use framing techniques to enclose any trademark
or other proprietary information (including images, text, page layout, or form) of Owner without obtaining Owner express written consent;</Text>
        <Text>provide your login details for the kOMMUNITY app to any other person or permit any
other person to access and use the kOMMUNITY app using your login details;</Text>
        <Text>impersonate any person, or misrepresent your identity or affiliation with any person;
do anything that is malicious, discriminatory, unlawful or fraudulent, or has any
malicious, discriminatory, unlawful or fraudulent purpose or effect; or</Text>
        <Text>do anything that could limit or prevent the proper working or appearance of the
KOMMUNITY app, or its use by other users.</Text>
        <Text style={styles.subheading}>Termination of Access</Text>
        <Text>Owner may terminate, modify, delete or suspend your user profile or access to the
kOMMUNITY app, or any part of the kOMMUNITY app, with or without notice to you if
you breach these Terms of Use, or if we cannot reasonably continue to provide the
kOMMUNITY app for any reason beyond our reasonable control.</Text>

        <Text style={styles.margin}>You may at any time terminate these Terms of Use by ceasing to use the KOMMUNITY
app by uninstalling the KOMMUNITY app from your device. You acknowledge that even
if your profile is deleted or your access to the KOMMUNITY app is terminated, any User
Content may still be:</Text>
        <Text>retained by Owner, as required for archival and administrative purposes;</Text>
        <Text>retained and used by Owner as contemplated by these Terms of Use; and/or</Text>
        <Text>retained, used and shared by other users.</Text>
        <Text style={styles.subheading}>Other Sites</Text>
        <Text>The kOMMUNITY app may link with or post content onto other websites which are not
under Owner’s control, such as third-party social media services, including, without
limitation, Facebook or Twitter. The links are provided for convenience only and Owner
does not endorse or assume any responsibility or liability for any communications or
materials available at such third party linked sites or for content posted onto those sites.</Text>
        <Text style={styles.margin}>kOMMUNITY will post tweets, direct twitter message and emails on your behalf to
twitter accounts and email accounts of listed organizations in the kOMMUNITY
application.</Text>
        <Text style={styles.margin}>You are solely responsible and liable for any interactions you may have with any linked
websites, services and other third parties, including any other terms, conditions,
warranties or representations associated with such interactions.</Text>

        <Text style={styles.subheading}>Repeat Infringer Policy</Text>
        <Text>In accordance with the the applicable law, Owner has adopted a policy of terminating, in
appropriate circumstances and at Owner sole discretion, users who are deemed to be
repeat infringers. Owner may also at its sole discretion limit access to the Service
and/or terminate the memberships of any users who infringe any intellectual property
rights of others, whether or not there is any repeat infringement.</Text>

        <Text style={styles.subheading}>Electronic Communications</Text>
        <Text>We may contact you to inform you of any new features or functionality to the

kOMMUNITY app. We will communicate with you through your social networking
service account (if permitted by your social networking service), by e-mail (if you provide
your e-mail address to us or if you allow your social networking service to do so on your
behalf), by posting notices on the kOMMUNITY app or through a push notification on
your device (if you enable such settings). When accessing the kOMMUNITY app
through a mobile device, your wireless service carrier’s standard charges, data rates
and other fees may apply.</Text>

        <Text style={styles.subheading}>Disclaimer of Warranties</Text>
        <Text>Owner does not warrant that the Materials and/or your access to and/or use of the Aino
app will be uninterrupted, free of viruses, error-free or bug-free. Owner makes no
representations about the Materials, the performance of the app or its accessibility or
availability.</Text>
        <Text style={styles.margin}>YOU EXPRESSLY AGREE THAT YOUR USE OF THE KOMMUNITY APP AND THE
MATERIALS ARE AT YOUR SOLE RISK AND THAT YOU WILL BE SOLELY
RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE, COMPUTER SYSTEM OR
ANY LOSS OF DATA THAT RESULTS FROM THE DOWNLOADING, INSTALLATION
AND USE OF THE AINO APP AND THE MATERIALS.</Text>

        <Text style={styles.subheading}>Limitation of Liability</Text>
        <Text>You acknowledge that when you access a link that leaves the Application, the site you
will enter into is not controlled by the Company and different terms of use and privacy
policy may apply. By accessing links to other sites, you acknowledge that the Company
is not responsible for those sites. The Company reserves the rights to disable links from
third-party sites to the Application, although the Company is under no obligation to do
so.</Text>
        <Text style={styles.margin}>You expressly understand that under no circumstances, including, but not limited to,
negligence, shall the Company be liable to you or any other person or entity for any
direct, indirect, incidental, special, or consequential damages, including, but not limited
to: (i) the use or the inability to use the Application and / or services; or (ii) the cost of
procurement of substitute goods and services purchased or obtained or messages
received or transactions entered into through or from the Application and / or services;
or (iii) unauthorized access to or alteration of the users’ transmission or data: (iv)
statements or conduct of any third party on the Application and / or services: or (v) any
other matter relating to the Application and / or services.</Text>

        <Text style={styles.subheading}>Indemnification</Text>
        <Text>You hereby indemnify, defend and hold Owner, its affiliates, subsidiaries, service
providers, distributors, licensors, licensees, officers, directors and employees harmless
from and against all liability, loss, damage, cost or expense arising from any claim or
demand made by any third party in connection with your breach of these Terms of Use
and/or misuse or unauthorized use of the app.</Text>
        <Text style={styles.subheading}>Governing Law and Jurisdiction</Text>
        <Text>Any dispute ,claim or controversy arising out of, or relating to the breach, termination,
enforcement, interpretation or validity thereof, including the determination of the scope
or applicability of these Terms of Use, or to your use of the Application or the Service or
information to which it gives access, shall be conducted in accordance with the
applicable arbitration and conciliation act. The seat of such arbitration shall be decided
by the owner. All proceedings of such arbitration, including without limitation, any
awards, shall be in the English language. The award shall be final and binding on the
parties.</Text>
        <Text style={styles.subheading}>General</Text>
        <Text>No delay or failure to take action under these Terms of Use will constitute any waiver by
Owner of any provision of these Terms of Use. If any provision of these Terms of Use is
deemed invalid, void, or for any reason unenforceable, that provision will be deemed
severable and will not affect the validity and enforceability of any remaining provision.
These Terms of Use are personal to you and may not be transferred, assigned or
delegated to any third party.</Text>
        <Text style={styles.subheading}>Communications</Text>
        <Text>Visiting the Application or sending emails to the Company constitutes electronic
communication by you with the Company. The Company communicates with you by
email or by posting notices on the Application. For contractual purposes, you consent to
receive communications from the Company electronically and agree that all
agreements, notices, disclosures and other communications that are provided to you
electronically satisfy any legal requirement stipulating that those communications be in
writing. This condition does not affect your statutory rights.</Text>

        <Text style={styles.margin}>You understand that once you register on the Application, you will receive short
message service (“SMS“) messages from the Company on your registered mobile
number. These messages could relate to your registration, or any updates and
promotions that are undertaken by the Company. Please note that the Company will
send these SMS messages only to the registered mobile number or such other number
that you may designate for any particular purpose.</Text>
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
