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






