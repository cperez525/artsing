# singID![license badge](https://img.shields.io/static/v1?label=license&message=MITLicense&color=red) ![langauge count badge](https://img.shields.io/github/languages/count/cperez525/artsing) ![top language use](https://img.shields.io/github/languages/top/cperez525/artsing)  
  singID.com (by Cristino Perez)
  
  signID.com was develped to provide a resource for singers who do not have the resources for their own professional website to create a professional online profile. This application also makes searching artists in the database extremely simple by criteria suitable for smaller/local/regional companies/organizations who need to fill vocalist positions.

  ## Table of Contents
  [Instructions](#instructions)  
  [Usage](#usage)  
  [Contributing](#contributing)  
  [Tests](#tests)  
  [License](#license)  
  [Questions](#questions)

  ## Instructions
  To use this platform, navigate to https://singid2.herokuapp.com/.

  ## Usage
  There are two core purposes for this application: creating your own vocal artist profile, or browsing existing artists in the database. 

  The upon arriving at the url provided in the Instructions section, you will be presented with the Home page.

  SITE NAVIGATION: 

  Navigation through this site is primarily accomplished through the navbar; however, upon initial arrival to the site, buttons are available on the home page to take you to your preferred destination on the site. The singID brand name on the left side of the navbar as well as the Home button near the right side of the navbar will navigate you to the home page if you are signed out or your profile page if you are signed in.

  A few navigation options change when you are signed in: for one, the sign in button in the navbar is replaced by a sign out button (which will take you back to the sign in page), and an edit profile button appears allowing you to navigate to a page that lets you edit and add information and resources to your profile.
  
  ![gif example](/images/site_navigation.gif)
   
  ARTIST SEARCH:

  In order to search for an existing artist in the database, navigate to the search page by clicking the "search artists" button either on the home page or (more conveniently) in the navbar. Doing so will take you to the search page which presents two separate options: Simple Search and Advanced Search.

  Simple Search searches multiple paramaters (first name, last name, city, state, and voice type) for your input to see if it matches any content within those parameters. Partial words will also attempt to be matched to content.

  Advanced Search can search multiple inputs you provide within the given parameter (IE- searching someone who is both a soprano voice type AND lives in Texas). This option gives you the ability to execute a more specific search.

  If your search matches any users in the database, they will be displayed in rows below the search form. Should your search yield no results, an alert will state that no results have been found.

  ![gif example](/images/artist_search.gif)

  CREATE AN ACCOUNT: 

  If you are a vocalist new to the site and would like to create an account, you may select the "Create an Account" button on the Home page, or alternatively (and perhaps less conveniently) click the "here" button below the Submit button on the Sign In page to navigate to the Register page.

  The form is fairly straight forward- you will enter the appropriate information in the input fields provided (and select your voice type from a pre-determined set of options). 

  Most of the fields on this page are required (the only one that is not is the School field). Should you fail to provide information for one of the required fields and click the Submit button, a message will appear alerting you to fill out the field.

  Validation exists for both the email and password fields. If you have not entered a properly formatted email address, an error alert will appear. As the password must be at least 6 characters in length, the same thing will happen should you attempt to submit the form with an invalid password (should you need help creating a password, feel free to go to https://cperez525.github.io/password_generator/ to use my password generator app!).

  After successfully completing your registration, a success message will appear for a brief period of time below the Submit button, and then you will be navigated to the Sign In page so that you can access your account with your login credentials.

  ![gif example](/images/register.gif)

  SIGN IN:

  To sign into your account, you will provide the email address and password that you entered when creating your account as login credentials. You can access the Sign In page by clicking the Sign In button on the Home page or clicking the same button in the navbar. Note that the Sign In button in the navbar will disappear after you have signed into your account and will be replaced by the sign out button.

  After signed in, an authorization cookie will be stored in your browser so that the site will remember that you are signed in until you sign out. You will remain signed in for an extended period of time as long as you do not sign out or close the web browser window you used to sign into the website.

  ![gif example](/images/sign_in_methods.gif)

  EDITING YOUR PROFILE:

  After you have just created your profile and log in, you will notice a stock image on the left side as well as a table on the right side that displays default context. In order to provide your own content, you can click the "Edit Profile" button in the navbar (this button is only available when you are signed in). No matter where you are on the site (even if you are viewing someone else's profile), the edit profile button will always take you to the configuration of your (and only your) profile information and content.

  Upon clicking the Edit Profile button, you will be presented with a page with a form and several tabs serving as options for which type of content you would like to edit/add:

  Info-  This option allows you to change basic profile information. Upon clicking the Submit button, only fields that you have changed will be changed on your profile. NOTE: Please be mindful that, if you change your email address, it must be formatted correctly. Additionally, you will receive an error alert if you attempt to change the email address to another that already exists in the database.

  Bio- This option allows you to write a bio for yourself that will be displayed in the bio section in the content table on the right side of your profile page. 

  Roles- This option allows you to add roles that you have prepared/performed. These roles will appear in the roles section in the content table on the right side of your profile page.

  Audio- You can submit audio recordings will be displayed and can be played on your profile page under the Audio section on your profile page. Please note that you must enter information in all fields as they are all required. The audio file that you choose is uploaded and stored in the Cloudinary platform.

  Video- If you have a performance video uploaded to youtube, you can copy the embed link (marked in quotes after "src=" in the embed section you are provided if you click the "Share" option on your youtube video). Much like the Audio section, all fields must be filled out to successfully upload a video. NOTE: You must provide the embed url for your youtube video- the video page url found in your address bar will not work for this feature.

  Headshot- You can use this option to change the picture displayed on your profile page. 

  After you have successfully changed any information on your profile that is displayed (Please note that emails and schools are not displayed at this time), you can navigate back to your profile page (while signed in) by clicking either the brand name or Home button in the navbar. Upon arrival at your profile page, you should be able to see the changes you have made displayed on your profile.

  ![gif example](/images/profile_edit.gif)



  ## Contributing
  Please email cristino.perez525@gmail.com with any feedback/comments/bugs.

  ## Tests
  To test, navigate to the website provided in the Instruction section, and then attempt to perform all actions described in the Usage section.

  ## License
  MITLicense

  ## Questions
  You can reach me through one of the following contacts -  
  Github contact: https://github.com/cperez525  
  Email: cristino.perez525@gmail.com
