![image](https://github.com/user-attachments/assets/cc13cd78-69de-41b8-8174-58a425e202e5)

# Hotel Reservation System 
Is designed to provide a seamless booking experience for guests looking to stay at the Hotel. The application caters to both potential and actual guests, offering comprehensive information and functionality to manage their reservations efficiently.  
You can try it here https://next-hotel-managment-system-demo.vercel.app/

## Technology Stack:

### Framework
Next.js: The most popular React meta-framework, handling routing, SSR, data fetching, and even remote state management.
### UI State Management
Context API: Used for managing global UI state within the Next.js application. Alternatives like Redux can be used, but Context API will suffice for this project.
### Database / API
Supabase: Utilized for data storage and API services. We will leverage the data and API built in the first "Wild Oasis" project.
### Styling
Tailwind CSS: A modern way of writing CSS, extremely easy to integrate into Next.js. Most styles and markup will be pre-written in this project.

## User Accessibility:

- Users of the app are potential guests and actual guests.  
- Guests can get information about each cabin and see booked dates.  
- Guests can filter cabins by their maximum guest capacity.  
- Guests can reserve a cabin for a specific date range.  
- Guests can view all their past and future reservations.  
- Guests can update or delete a reservation.

![image](https://github.com/user-attachments/assets/23e0f1fa-6d05-4493-ab18-b216cf2b6a76)

![image](https://github.com/user-attachments/assets/b69f037b-7d03-4cf5-a108-e072880d2e40)

## User Authentication:
- Guests need to sign up and log in before they can reserve a cabin and perform any operations.  
- On sign-up, each guest gets a profile in the database.  
- Guests can set and update basic data about their profile to make check-in at the hotel faster.  

![image](https://github.com/user-attachments/assets/5f8ee031-cfff-4392-a880-db22a406efd4)

## Reservation Management:
- Reservations are not paid online; payments are made at the property upon arrival.  
- New reservations are set to "unconfirmed" (booked but not yet checked in).  

![image](https://github.com/user-attachments/assets/3375e710-14a6-4f6a-a156-8118085cc33c)

