require('dotenv').config({ path: '../../../.env.local' });
const {openai, supabase} = require("./config");


//Only Ran Seperately by me (Ansh) to update Supabase Vector Database.
//FUTURE VISION: Use Langchain Recursive text Splitter rather than array of content.

//Information to create embeddings out of
const resumeContent = [
    "What program am I pursuing in University? 3rd Year Computer Science student specializing in AI and Machine Learning studying at Carleton University. I am minoring in business entrepreneurship.",

    "Do I have Linkedin? Yes, my LinkedIn is at this url: https://www.linkedin.com/in/ansh-kakkar-471a0a288/",

    "I can be contacted via email at: anshkakkar05@gmail.com.",

    "What are my hobbies and what do I do in my free time? My Hobbies include Riding my bike, weightlifting, spending time with family.",

    "What is my favourite food? My favourite food is Shahi Paneer with Garlic Naan Bread",

    "What programming languages, frameworks or technologies do I know? The programming languages I know are Python, Java, a bit of C++, Javascript and SQL. I am familiar with frameworks/libraries such as React.js, Tailwind CSS, Numpy, Tensorflow. ",

    "What are my strengths? I am a very dedicated student and have a passion to learn new things. I am a strong public speaker, collaboartor and work well with others.",
    
    "What are my weaknesses? I came into Computer Science without knowing any coding. I struggle to discover new topics at times, but tackle my weakness by spending time self learning programming! ",

    "Do I have prior internship experience? I worked my first internship Summer 2025 at Trend Micro Kanata as a Software Developer CO-OP. I worked on a cool AI-Security project which I got to see build from ground up to the MVP phase. I got lucky to work on something new and impactful where I got to program in Typescript, React, setup i18n support, playwright testing and presented the project to 150+ people across all R&D teams at Trend Micro. I also interned at Kinaxis as a Software Developer in Fall 2025 where I worked on rebranding of Maestro, a cloud based supply chain platform. I performed lots of bug fixes, introduced features for accessibility and contirbuted to testing. ",

    "How are you involved in the community? I volunteered for CUSA (Carleton University Students' Association) in my first year and was a Partnerships Coordinator for Hack The Hill and helped to run one of the largest hackathons in Ottawa with over 800 attendees. Currently I am apart of Carleton Blockchain club, a new club and helped organize the first 5 events ever! I also TA'ed for COMP 1805 Discrete Structures in Fall 2024 and Winter 2025.",

  "Have you attended any Hackathons? Yes, I have attened uOttaHack6, Discover Technata Hacks, DreamLaunch Startup Weekend, The Defi Crunch and ENGCOMM X MONTREAL. I look forward to attending more events and conecting with others in the community.",
  "Have you won a hackathon? Yes, me and my friends went to Canadas biggest vibe code hackathon by AI-Tinkerers. We won the top prize for best use of Tavily API, worth $2000 and best use of Windsuf IDE worth $300",

  "What projects have you done? All of my projects have been completed via self-learning. I have made a React Fitness Website using Restful API's as I am super passionate about fitness. I have explored React with Typescript and Tailwind CSS by making a Bookmarking Chrome Extension. My Machine Learning Projects include exploring supervised learning algorithms such as SVM (Support Vector Machines) and Logistic Regression by applying them on a Diabetes Prediction Dataset. I have also user Deep Neural Networks with the CIFAR-10 Dataset and used Convolutional Neural Networks. Check out all my projects on github: https://github.com/anshk8.",

  "Why should I be hired? I am a team leader who brings a positive attitude and encouragment to teams. With my strong work ethic, passion for learning and collaborative approach at solving complex problems, I will be an asset to your team!",

  "What year are you in? I am in my 3rd year and set to graduate in 2028",

  "Are you in the Co-Op Program? Yes, I am enrolled in Carleton University CO-OP Program.",

  "What do you want to acomplish? I want to gain hands on experience solving real world problems that make the world a better place. I hope to learn lots, be a leader whereever I can and have a positive impact on my peers around me.",

  "What roles interest you? I am interested in roles around Data Science, AI/ML and Software Development in general!",

  "When are you available for a CO-OP Term? I am actively searching CO-OP positions for Summer 2026!",

  "What are some academic Achievements? I have maintained a high GPA of 11.8/12 and was the recipient of Tracey and Siva Ananmalay Scholarship in Computer Science from Carleton University. I was also awarded a Golden Key Honour Society Membership. ",

  "What languages do you speak? I speak fluent English, Intermediate French and fluent Hindi. I have a DELF B1 certificate for Intermediate French skills. Je veux ameliorer mes compétences en francais :)."
  
];



async function main(input) {

    //Create embedding through each line in array via OPENAI API
  await Promise.all(
    input.map(async (textChunk) => {
      
      //OpenAI Embedding function
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: textChunk
        });
      
      //Store embedding and actual text
        const data = { 
          content: textChunk, 
          embedding: embeddingResponse.data[0].embedding 
        }
        
        // Insert data into Supabase
        const {info, error} = await supabase.from('documents').insert(data) 

        //Error Checking
        if (error){
            console.log(error)
        } else{
            //Double check information
            console.log(`Info Added: ${info}`)
            console.log('Embedding complete!');
        }

    })    
  );
 
}

//Run Function
main(resumeContent)