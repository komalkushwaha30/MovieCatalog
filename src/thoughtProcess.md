My Though Process and ideas while making this project 

I wanted to give you a behind-the-scenes look at how I put this project together. 
My journey started with setting up basic user authentication, then moved into handling and 
displaying a lot of movie data efficiently. I'll cover everything from the dependencies I chose to the decisions I made about UI and performance, plus some ideas for future improvements.

How to run the file 
First write npm install to install all the dependecies, and then next : 

1. In one terminal perform below command to run the backend
cd Movie
cd server
node server.js 

2. In other terminal run these 
cd Movie
npm run dev


Approach 
1. Import all the dependecies 
axios - this for handling the url 
routing - for the naigation 
bcrypt - for password security 
cors - for letting the backend to talk with the frontend
express - for managing restful api and creating our own server
fs - for reading and writing our json file since our database will be json file
react-select - for creating the mutliple selection dropdown.





FETCHING THE DATA 
for fetching the data I followed following steps 
1. First I imported the movies.json file data by giving it the name "movies"

2. Then I store that data into an useState 

3. later I worked on its UI building, for that I wanted to show only few details in the card  with the option of view details because there were a lot of details and this migth look too much in the dashboard.

4. Therefore I used the map function and then,and on every iteration I passed the compoenent names as "Card" which build gives the card with basic informations like key , title etc. 

5. I pick to make a Card component intead of writing the code in the loop itself because of 2 reasons 
- first is that as a good developer I should make the component of the things that are keep on repeating 
- and secondly I can use this component in future in this website for any other use there it improves the code reusability

6. A detail overview of Card component : 
- I made a component and destructure the items that I received while using the Card component {title, img, rating , genre, item}
-this allowed me to directly use the variable instead of using the dot notation to access the item 
- Then I made a div, and inside the that div , I represented informations like title, rating , and in genre , I first check if the genre is an array, and then dipicted the genre comma seperated and at last View details button


7. Now again comming back to the Display component, I showcased the item in the form of grid, why ? , because of two reasons 
- before doing this , I observed few moviees website and e-commerce website where they represent in the form of grid which has and there is the tendency that user also becomes used to it 
- and secondly because it we total 10000 data and showing everything line by line will result in a lot of paginated pages and in grid I am showing approx 4 items in one row and here I am showing 1 item in one row which might take time to load on UI as well.



8. Pagination implementaion : 
Once we are done with storing the data in the useState variable and displaying the item on UI with grid format, we will implement paginations 
-first of all what is pagination and why we are even implementing the paginations? 
- yes of course its the part of assigment task but there are many other reasons to implement it
-but first let just understand pagination. 
Pagination is way of dividing the large chunk of data in small pieces like pages. 

Now we do we need paginations 
- first is because its help in optimizing the website , because loading the large set of data would be difficult but when we only loading small chunk of data at time, improves the performance of the website 
-second is that user do not have to endlessly scroll throught out the website, in perspective of user it might look frustrating not to find the footer / end section of the website and just have to keep on scrolling 

Implementation of the pagination for client side pagination
1. total number of items in one page - I took 120 because this will also allow me to have less pages button as well

2. find the total number of products in the movie.json - so that we can later divide it (total number of item in one page) so at the end we can find the total pages of paginations

3. now find the total number of pages as per the pagination.

4. we also need to store the  currentPage in the useState to track the current page. 

5. My brute force approach here is now that I will slice the product based on start and end variable and map over them to show the pages.
for example if its 0 to 120 so my website will only show items from 0 to 120 of the data(movies.json)
and at the end iterate over all the items 

6. also the logic of start and end is find by taking the help of the currentIndex. 
start will be the currentPage * size of one particular page 
eg . if the currentPage is 0 the the 0*120 will be 0, which means the start is 0.
and to calculate the end which is starting point + page size 
so that we can get to know the end 
eg . start is 0 and page size is 120 so 0+120 is 120.
there for the it will be 0 to 120 but since the slice does not include the last element so it will just have 0 to 119 in the first page. 



7. we also had previous and the next page which has the logic where it is adding and substractiing -1 from the previous value 

8. just to show the pages number for that we used the component PageUI showing all the button and inside that all the page number is visible. 

9. we also applied the css on the active class by using string interpolations so that the active class can can unique easily 
eg   className={`btn ${curretpage==item ? "active-page": ""}`}


10. also we applied the button diable for the previous button where the page number is 0 so that it should go less then 0 and on next page is applied disable buttom when the current page is the last one 



Search Functionality Implementation
1. To implement the search functionality, I make a component named as SearchBar with a label and input box

2. Once the UI is done then we added the event onChange on the inputbox and pass the event as the parameter 

3. The event name is handleSearch which will set the setSearch a state in the parent component for the state lifting because it has to be used by parent and the child both we can not keep the setSearch in the child component. 

4. We set the setSearch to e.target.value this help us to store the variable that has been written in the input box

5. And now when it comes to logic part of the search bar , what I did was I applied normal filter method when I was passing the search state and filtering it by multiple or statements. 

6. It was work fine but the problem was that the website was working way to slow, like it was taking time like 2-3 second to show the card dynamically. In my perspective, because the dataset is large maybe that's why it was taking a lot of time. 

7. The solution : To optimize this, used debounced search. The thing is when I search anything on the search box, the filter option get triggers always but when we apply the debounce search, it reduce the number of triggers for filter 

- It details the trigger search, by allowing user to type and wait for the time mention, in our code it is 300 mili seconds

- now how we implemented in our code : 

-we first make a function name useDebouncedValye where we have two arguments, value and delay. 

- the we declare the state deboucedValue and setDebounced value and keep its initial value as value. 

- then we use useEffect hook because it will work automatically without any human intervention. 

-It has two function, one is of setTimeout and another is the cleanup function. 

- In the setTimeout function , setDebouncedValue get updated as per the delay time  and we also run the cleartimeout to clear the setDeouncedValue of previous, and at last return the debounced search 

and now we will use a variable to store the debouncedSearch function value and then apply our usual logic of filtering the search. we stored this debouncedSearch value as query varible and then applied multiple or conditions to check if it includes the title or any other keyword. and in genres keyword I first check check if its an array because it has multiple genres and then join in form of string by so that I can query like a normal string.


BASIC FILTERING OPTIONS 

- to implement the basic filtering options I start from very basic by creating the UI. 

-for that I first created the arrays of the objects, where I saved rating array with its element as an object with items label and its value . Same I repeated this with geres and years so that I can Iterate over the objects and show it in the ui.
I did this with genres and years as well

- I created a component named Filter,because this code was repeating itself, where I  have destructure the menu which means it will have the array, the setCurrentPage which will set the CurrentPage to 0 because we have all the items in total otherwise if our page is on the for example 5 page number so it will not count the items that are below the page 5 like page 0 or 2.

- thn we will destructure setValue which will keep the value of option. 

- Then we will build the UI by using the select element and option element for the dropdown. and we will map over the menu and use option element to display option.label (option is the name we selected while iterating menu) and will provide a key to it using index, providing idex will help me in future in uniquely identifying it, and modifying the particular element.

- we will also use the onChnage on the select which means whenever the we will choose any option then the value of select will keep on changing. 

- the we will use the handleChange function and setValue to e.target.value and setCurrentPage to 0;

-Logic of the filtering 

-first if all we used the useMemo for the optimization of the website and bring all the filter logic of rating, genres and years together. this consolidate  the logic avoding confusion.

- first let's understand the logic part of rating , years and genres. 

- Rating : if the rating is not all that means we can apply the these conditions, 

-now the thing is that the value we provided to the options are all strings like "10" and here we have to do strict checking which means , we have to check the value as well as datatype therefore, we are doing storing the rating value in a variable name as ratingVal and parsing which means converting the string into interger and that to in decimal format with base 10;

- now we will keep the conditions like ratingVal = 10 , the filter the movies with ratings 10, and so on and store the filtered array in an variable known as movie


Fixing the rating : I thought like if I keep the rating as 10 at first then everyone will watch the movie with highest rating so instead of that I have kept it as adjective like excellent, good, average etc


- same I did with the years, and I took the gap of almost 50 years so that I can reduce the option in the dropdown, because user can get more confused by seeing a lot of options and may be sometimes they are not sure about the years of the movie when it released. 

- and did the same with the Genres. I will chage the logic of genre once I have to make the genre for the multi selecting options. 


MULTI SELECT DROPDOWN
- multi select dropdown will allow us  to enter the multiple genres in the same input field.

- UI making 
we used the library react-select for the UI. 
- isMulti - allows mutliple options to be selected 
- options={genres.slice(1)}  - it will give all the options exept removing the first one, because we can not choose whole, it will the initial part, and selecting all will show all the data so not point of choosing. 
- value={Genres.map((g) => ({ value: g, label: g }))} : 
so it is used for storing the Genres state data in the form of array of object like if Genres is = ["Action", "Comedy"]then it will be stored in the form of 
[
  { value: "Action", label: "Action" },
  { value: "Comedy", label: "Comedy" }
]
- the we will apply the onChange event where , we will update the genre and with what option we have choose 
- setGenres : when user we select or deslect something, then we will have an arrays of object. then we will map through the value and Update the Genres state. 

- and we will reset the pagination as well. 


-Logic part of the this multi -selecting genres 
1. if the user has selected any genres(we will find it by Genres state's length)

2. then we will filter over it , and save the filtered movies in movies variable 

3. now we will apply the filter function and save each time in a variable itemGenres and will check if its a arrays , if not we will make it an arrays 

4. now we are using some, this is used for if at least one match exists → this movie passes the filter.

and this how we will get out multi select movies. 


DYNAMIC RANGE SLIDER 
This filter option will be used to allow us to select the duration between the movies. and we can also increase and decrease that. 

UI creation : 
- for that we have taken two range input one to show the minimum one and second two show the max one 

- we have attributes as min (to show the minimum length), max (to show the max length ), steps= {5} (means it will grow as per 5 mins gap) and value will be lengthRange state's first value. 

- in input range 1 , we have an onChange where it will setLengthRange one to e.target.value and that too in the number format and second element remain the same 

- likewise in the input range 2 , we have onChange where it will, setLengthRange 2 , its second length to e.target.value and convert it into number. 


Logic part :
- we will filter the already filtered variable move and store it into the same array

-This keeps only movies where:
length_in_min is greater than or equal to the min
length_in_min is less than or equal to the max


Fixing bug in the slider:
- after performing the black box testing multiple time, I realised that in my range function , my minimum slider can become greater than the maximum slider and vice-versa. 
-this was leading to show no items in the grid 
-to solve that I initially thought that I will use the disable option in both of them, on the condition that in min (lengthRange[0]>= lengthRange[1])
which means diable the input range when the smaller is greater that the bigger and vice versa. 
-but the problem with this one was that after the ranges getting disabled, how should I bring them back to normal, because I cannot do any chnages since its disable. 
- therefore I though I have to find a way by which the minimum number should not be reater that any maximum at any cost
- for that I thought that keeping gap between them might workout. 
- for that I want to keep the gap of atlest 5 becuase my gap size is five to that I want compare the value 
- for that on the onChange event handler, I first converted the string value into the number, and then checked if the newNumber is less than larger number - 5 inorder to maintain the gap of 5. if that true means the large number atleast greater than 5, then set the newNumber as lengthRange[0] else do not do anything.
-same I did with the lengthRange[1] but this time + 5 gap. 


USER AUTHENTICATION

for the set up the tools we need
First, we bring in some dependencies:

Express – to build our API routes and handle requests.

fs/promises – so we can read and write user data to a file (users.json).

bcrypt – to securely hash passwords so they’re not stored in plain text.

cors – so our frontend can communicate with this backend without any cross-origin issues.

then we will create and configure our server
We make an Express app (const app = express();).

the we enable cors() so requests from other origins (like our frontend) are allowed.

We use express.json() so the app can automatically parse incoming JSON request bodies.

Helper functions to manage users
Since we’re using a file as a simple database:

loadUsers – reads the users.json file and parses it as an array of users. If the file doesn’t exist yet, it just returns an empty array.

saveUsers – takes the user list, converts it to JSON text (nicely formatted), and saves it to the file.

Create a register route
When someone registers:

We grab the email and password they sent.
We check that both fields are filled.
We load existing users and check if that email is already registered.

If it’s a new email:
We hash the password using bcrypt (with 10 salt rounds, a good balance of security and speed).
We add the new user (with the hashed password) to our users array.
We save the updated array to the file.
We send back a success message.
Create a login route
When someone tries to log in:
We grab the email and password.
We make sure both fields are provided.
We load existing users and find the user by email.

If the email exists, we compare the provided password with the stored hashed password using bcrypt.

If it matches, we send a success message. Otherwise, we tell them the credentials are invalid.

Start the server
Finally, we tell our app to listen on port 5000, and log that the server is running.


Implementation of the backend : 
we will make an Register component and the we will make a function for the register, for the post request which has email and password as arguments

UI Building : 
then we will build the ui for register having email , passoword and button to submit and navgiation to login option. 

we will also save the email and password in a state and then will call the function of register which we made above. 

we will make one more function handleRegister, where we will call the function of register and keeping email and password as parameter. 
for error handling we will keep it in try catch block and the if the try block is sucessful the will will set the isAuthenticated as true and navigate to dashboard else 
we will enter the catch block and use the alert statement to show the error message and that it failed. 


Login : 
Once the user has register , they will land on this page 

UI building : 
for that we will have two input box with one button and other to navigate to the register page. 

to store the input email and passoword, we will use state to store and will update on the onChange.

we will have the function handleLogin to call the function inside the try-catch block to handle the error. 

if the data sucessfully got login the it will set the isAuthticated as true and set the current user on the localStorage, and then navigate to the dashboard. 

else we will enter the catch block where it will show login failed by an alert.



ROUTING : 
since we are done with the basic functionality , now we will check the basic routing. This helps in navigating from one page to another. 

- Here we are using the declartive routing which we is a very basic type of routing.

- for that we will install react-router as dependecy.
and in main.jsx , we will wrap the App component with BrowserRouter 

- In app.jsx , we will import all the required compoenents. and then we will use <Routes> and inside that we will write <Route> and inside that we will mention the path and element. This is how we are done setting up the basic routes. 

- but we want more security that when the user is not logged in then we want to show only login or register page to the user and for that we need to create the protective routes. 

- for that I have created a function, ProtectedRoute, where it use the function isAuthenticated, this checks if the user is authenticated, so it is retrive the data from localstorage, I thought storing data from local storage will be a good option, since it will be easy to check if the user is authenticated and if it alredy authenticated then user can access the dashboard.


- and I also added the route for not found, when any route doesnot matches, because user can atleast get to know that the route does not exists. 


DARK AND LIGTH MODE
When it comes to choosing the theme for the website, I feel like there are  users who likes the theme to be  dark and there are others who like the theme to be ligth, so we can not stick to one theme so, I build a these switcher, which has both the card and ligth theme. 


Implementation : 
- I implemented the dark and ligth theme by making a state which stores the true and false if the theme is dark or not. 

- I kept this theme in a context because it was getting used through out the pages and I did not wanted the problem of prop drilling so I made it a global state. 

- I first created a context and made provider out of it where I passed both the variable and then made my custom hook so that I can use it anywhere in my probject. 

- also applied the context provider in the main.jsx, so that it can cover my whole website. 

- and when it comes to usage , I have import these states like 
const { darkMode, setDarkMode } = useColor();
and then based on this , I have provided the class name. 


LIKED LIST :

I also that I want to make the thing to be little dynamic because all the user will have the same UI, so I added the section of liked movies. I have seen the website like spotify where they have liked playlist attracts the user to spend more time on the website, because it is getting customized as per that. 

Implementation : 
I wanted to use it during showing the card and second 
in the detailed page of the movie, so because it is being used 2 times and donot know if there will another place where I will be using this feature in my website so I declared in the colorContext file only and passed it as value and made it a global variable.

- also as I will be storing in local storage so that user can access it from the browser, I have applied few checks. 

- for that I have retrive the userId, and then check if the it does not exists the return a empty arrays, and now retrive the like counts , and if its there so parse it in array else give empty array. 

- also just in case if the user get changes the there is useEffect that will run and try to get its like count from localstorage and if it does not exists then return an empty array. 


- There use also useEffect that chnages when the like or userId chnages means a new user is using it or modification in like , and its just simply set the like counts in localstorage.


Usage : 
When the user clicks on the button of like, then the I have applied the logic that setLike to array and add a new item. 
since when we add anything in array via states so we have to first copy it and then add the item, likewise first I copied the array via spread operator and then added the item.

Displaying like : 
and to display the liked list , I have retrived that arrays and map over it, if the array is empty then it will simply show that the liked list is empty else it will map over ever item and display it. 

I have just showed a few info like image/poster and then rating and remove option where it remove the item from the array by filtering and view detail option where it will see everything in detail. 

so that user can go through all the liked movies and I have dedicated one row for each item of liked list. 

Debugging the Liked list 
during the interview, I came across the problem that when I was clicking on card's like button therefor it was getting added to the playlist repeated times, becuase it becomes the loop hole in the functionality 

we wanted that if the like playlist already have that movie in the list, then the add button should show the label as remove, vice-versa.

My appraoch here was that finding the if the clicked element exists in the liked playlist, and then based on that I would have changed the name of the button. 

for that I thought to filter the arrays and will get if the array exists or not, later realised that it, filter return an array and I am searching for a boolean value to check if the item exists or not. 

Inorder to get the boolean value by using find functionality and it was working partially because find was returing the object of the array when the list of item was present else return undefined which is at the end a falsy value. 

but after that I realised that some function return the true and false, therefore I applied  the some function on liked playlist inorder to check if the item exist or not then if its false, the add the element to the  liked list else do nothing. 

but I also had to add the label on the button that it should be add or remove and for that as well, I would have required check if the clicked item in the playlist or not. for that, again I would have to use the some function. 

therefore I move this variable "isLiked" at the global level so that I just have to write only once, and by the ternary operator, we assigned the button name based on if its liked or not and also handle the function where once the item is already there in the likeList then it shows remove on the button , and if we click on remove, I added the functionality of filter it remove the item. 

by this procedure, we solved the bug, where if the item is already there in the liked playlist then it cannot be clicked again until we remove it 



DETAILED PAGE 
I have designed this detailed page because I felt like user on the dashboard just want to see the overview but to know the movie better, it will require detailed page and showing everything on the dashboard page migth bore the user. 

so the details page will have all the details about the movie. 

Implementation : 
for this I have setup the route where the title of the movie will be showed in the url since no id was provided. 

and then user will use useParams hook to store the title and then find the movie which matches the title. 
also since there were question marks in few movies which were not getting store in the variable so I replce the question mark with empty string and then it started working. 

if no detailedItem found the it will show that no item found to inform the user

else it will share a-z about the movie which has been provided.

and also had the option of Go back by click on useNaviagte. 


LOGOUT: 
I felt like there is not ending point for the user in the website if user wants to come out of the website and for that I have logout option. 


Implementation : 
I kept this  in context, since we can use it in navbar 
which will be there throught the website

I just remove the current user and set the userId to null and kept the like to be empty string. 

and used a button to call this function. 


CSS part : 
when it comes to css, I have kept it mordern and professional UI : 

Theme : I have two themes 
- ligth theme - consists of white, pastal , mehroom color 

- dark theme - consist of grey and yellow

Responsive : 
- I have kept it responsive by media query 
- also I have used grid with auto-fit with minmax 260px
which will make sure that the cards are responsive 



ENHANCEMENT AND IMPROVEMENT IF MORE TIME WOULD BE AVAILABLE 


1. First I would focus more personalising the website for user. For that I wanted that if the user choose one movie and opened its detail page then, there should be an option of showing the similar movies like the one user choose. 
for example if user choose a horror movie,then below that a section called " you might like these as well " 
would come below that showing the related genre movies. 


2. I would work on the part of user profile, where user can change or edit, its detail and abviously view its profile. 
for example : uploading display picture or changing password or email id etc. 


3. When it comes to the liked movie, that is happening from the local storage which is more frontend oriented, I would have tried to do it from backend because just in case user clear the local storage. 


4. Also we can email the user time to time if theres any offer going on , or no the release of any new movie. and user can also stop these email by unsubscribing.

5. Further it can also have facilites like premium subscription where the user will have more extra advantages from the this movie cataloge website and add the payment gate way for this. 


6. Also I would spend more time in testing the website , so that I can debug it if there any. 

7. I will try to structure the website more by adding the navbar and footer and few animations if possible. 


And all of these are the idea that I can think of that can make this website more user friendly and make it look more relevant to the real world and for that I might not know everything about it but I will surely learn and implement those by learning and then applying. 



PROFILE SECTION
As I wanted to work on the profile section because I feel like the content is modified for the user, then they tends to stay more on the website. 
therefore, in the profile section first I added their basic details section which show their email id, username and bio, and they can edit these as well. 

then I thought, providing photos randomly will be something intresting, therefore I fetch the random photo from an api and set it as the display picture. 

In the next part, I focus on analysing the choices of the user, and provide them some insigthful and personalise data to them, for that I have three sections, liked playlist , Your favourite genres and lastly Directors and cast. 


now the question is where this data will come from. so it will come from the liked playlist of the user. 
liked playlist will display the name of the movies.
Favuorite genres will find all the genres present in the liked playlist,also it will count the count of the repetition of the genres and by the same way it will list the directors and cast.


since it was looking pretty simple, herefor I added a side bar with the link attach to it 



SIDEBAR NAVIGATION
The idea was simple:
I wanted users to quickly move between their profile, their dashboard, their liked playlist, or even go back to login/logout. So I added a sidebar on the left side with links like:

My Dashboard

Profile

Like Playlist

Login

Each of these links helps the user navigate through the app easily without feeling lost. Also, I added a "← Go Back" button on top of the sidebar to allow users to go back to the previous page, which I felt adds a nice user experience.

PROFILE PICTURE UPLOAD
Initially, I was just fetching random avatars, but then I thought — what if the user wants to use their own image?

So I added a feature where users can click on their profile picture and upload a new one. I use URL.createObjectURL to preview the uploaded image immediately, and I update the state and save it in localStorage, so even after a refresh, their uploaded picture is still there.

EDITABLE FORM
One thing I made sure to include was that the user can actually edit their name, bio, and phone number. I wrapped these fields in a simple form that appears when they click the “Edit Profile” button.

When they submit the form, the data is saved again to localStorage so it's always remembered.

SAVING TO LOCALSTORAGE
Everything about the profile — the avatar, name, phone, bio — is saved in localStorage under a key like profile_user@example.com, so that each user can have their own profile data stored separately.

This allowed me to simulate a logged-in user experience without needing a real backend. For me, as someone starting out, it was a great way to build something functional without having to deal with server-side logic just yet.

PERSONALIZED INSIGHTS FROM LIKED PLAYLIST
Then I came back to the analytics part, and built the three main insights:

Liked Playlist: Directly shows the titles of all the movies the user has liked.

Your Favorite Genres: Loops through all genres in liked movies, counts frequency, and shows the top 5.

Directors and Cast: Uses sets to filter unique names from the liked movies, showing the user's favorite contributors.

Each of these sections gives the user a more personalized view of their taste, which I feel can really increase engagement — because who doesn’t like learning about their own preferences?

FINAL THOUGHTS
By the end, I had a profile page that wasn’t just showing user info, but was also giving useful and engaging insights. It felt interactive, dynamic, and personalized — even though I was just using React, Context, and localStorage.

I learned a lot about state management, controlled components, conditional rendering, and user experience through this process.

If I were to take this forward, I'd probably:

Add real authentication
Connect to a backend for persistent storage
Allow sharing of profiles or playlists with friends
Add watch history and reminders




"YOU MIGHT LIKE THESE AS WELL" SECTION
After setting up the movie details page, I started thinking:

“What can I show the user next that keeps them engaged after viewing a movie?”

And that’s when I got the idea for a "You Might Also Like" recommendation section — something that suggests similar movies based on the one they’re currently viewing. Almost every streaming platform does this, and it really helps in keeping users hooked and exploring more content.

STEP 1: FINDING SIMILAR MOVIES
So, first I had to decide how to define “similarity” between movies. I broke it down into 3 simple criteria:

- Same or overlapping genres (like both movies being thrillers or comedies)
- Shared cast members (same actors or actresses)
- Released within a similar time period (±5 years)

for that , I first tried to avoid comparing the movie with itself


So if even one of these three conditions matches, I include that movie in the recommendations list. Then I just slice it to the top 10 to keep it short and neat.

STEP 2: CREATING A CUSTOM CAROUSEL
Now that I had my list of similar movies, I didn’t want to show all of them in one long vertical list. That would take up too much space and look boring. So instead, I made a carousel-like component, where only a few cards show at a time and the user can scroll through them with arrows.

To handle this I added a little logic:

If screen width is less than 700px → show 1 movie at a time.

Otherwise → show 3 movies in the view.

There are “Next” and “Previous” arrows to scroll the list.

The carousel just shifts the starting index of what’s being shown, using carouselIndex.


For each similar movie:

I show its poster, title, genres, and release year.
When the user clicks a card, it navigates to that movie’s detail page using React Router’s navigate.
This way, everything feels smooth and connected. You’re just one click away from discovering more movies.

This part was really fun to build because:

It gave the app a real recommendation system feel, even without AI or a backend.

I learned how to filter and compare data in React.

I also practiced building a carousel-style UI from scratch using just state and slicing.

And overall, it made the movie detail page feel way more complete and user-friendly.



NAVBAR AND FOOTER SECTION 

Actually after building most of the functionality, I felt like everything is not arrange properly, and during interview, also I noticed that if the user want to go back from the like section then I have not provided any links and user might feel confused as to where t navigate. 

for that I had to bring all the button like , darkmode, home page button, like playlist button to the navbar. 
it was an important task because, I have provided the classname of the body based on the darkmode variable. 
but since I have mentioned in the context therefore I can shift all the elements to the navbar.
so I kept the name of the movie (NavFlix = Navgurukul + Netflix)
then gave the homepage, like and profile section in the middle, 
then the theme button and name of the user and at last logout option. 


and I made a simple footer section at the end by mentioning year dynamically and writing rigth reserved and mentioned the creater's name. 



DESKTOP REMINDER
- This is something that I wanted for my website is that a reminder. I created this so that user can reply on this app, and can set the timer for watching their favourite movies. 
- I have added this in the profile section where user can set and remove the reminder
- working : 
- when we like a movie , then we can see that in our profile section
- when click on the set timer, a pop box will appear asking the time
- then browser rest of the things 
- it only shows up once. 

- all the reminder are stored in the browser, in local storage 
so that the reminder remain safe, even if we close the tab


BRINGING MINOR CHANGES 
1.Brought the pagination at the bottom because pagination button mostly stays below, otherwise the front is lookign very unorganized. 
- also decreasing the number of movies to 72 so that user should not just keep on scrolling to reach at the end 
- and why 72 because in the large devices, 4 movie cards are shown and therefore to complete the row , I want something divisible by 4 to show all completed row , that's why 72.



2. Reset function : 
I was keep on checking the filter and then reloading it again and again, leading to break my flow, therefor I build the reset functionality which will bring all the filters to its initial value just in one click. 


3. Range input thinkess : 
I also felt like the range part is covering very less space and may its presence is less visible and pretty confusing becuase of two input so I made the input width a littl wider 


4. Alignment of  the filters : 
I felt like the way I placed filtered were pretty crowded because, few of them were not aligning together vertically and horzontally and since its my first part of the website therefor , I wanted to make it look pleasing. 
therefore I divided them all in two rows and kept the search at first, because I think it will easy for the user to find search as the first option. 

5. Fixing the bug of detailed search : 
initially I was using this function to search the movies to showing in detailed page 
item.title.replace(/\?/g, "").trim() === title.trim();
I was using this question mark because there ware a lot movies having question mark but during fetching from params it was not visible 

for that we this function only calls when the item.title is only a strings because this fucntion of replace only works on the strings , therefore to prevent it from any further error we are also checking if the title is a string or not. 


6. Carousel in the front : 
- even after applying the better alignment of the filters, it was still looking basic, so I added a carousel which will work automatically after particular interval, making the front page more attractive. 
for that I have first made thought of making the array of image from the movies data provided and then map over it to show the carousel. 
- The problem was that multiple images were not working, so I manually find a bunch of images and put them in a array 
- Then I made a seperate component , just in case of resuability 
- later I set up the state, here we are using useState and useRef
- then bceuase we want it to happen without any user interaction , we will use useEffect. 
- and inside that we will use the setTimeout function that will keep on updating its index.
- at last we will render the image with the fading transition
- One small but important detail I added was a dark gradient overlay on top of the images. This helps if I want to place text, buttons, or logos on top — they’ll stay readable no matter how bright the image behind them is.



These are were the few changes, I tried to implement inorder make the website more eye catching. 