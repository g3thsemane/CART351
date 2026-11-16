Benjamin Merhi
Professor Rosenberg
CART 351

Mini-Project #1:
Mountains of Meaning

Mountains of Meaning is an interactive data visualization project that explores the intersection of human meaning and algorithmic representation. Users answer a straightforward question, “What gives your life meaning?”, with a single word. The word is then collected and numerically processed into a 3D Gaussian mountain. Through the accumulation of these mountains, a topographical landscape begins to appear. While the resulting landscape may resemble a scientific visualization, the formations are generated through mathematical operations that emphasize their numerical properties rather than the actual meaning. As a result, the project investigates how algorithms can produce representations of meaningful information without necessarily preserving or understanding the original significance

The conceptual foundation of the project draws from Hito Steyerl’s A Sea of Data: Apophenia and Pattern (Mis-)Recognition, particularly the concept of apophenia and the identification of patterns in data. Apophenia describes the tendency to perceive meaningful relationships within information that may be random or unrelated. In Mountains of Meaning, the viewer is presented with a representation that appears to be a result of collective response and experiences. Mountains emerge across the plane, coming together to form a landscape that suggests meaning behind the words. However, the algorithm is not analyzing the actual significance of a given word. Rather, the characters of a word are transformed into numerical values that then dictate the properties of each mountain. The algorithm does not interpret semantic meaning, but instead it preserves statistical properties of collected data. For instance, repeated words generate overlapping formations, increasing their elevation and representing the frequency of a certain response. However, these numerical relationships don’t necessarily correspond to meaningful relationships between the participants' experiences. While the words genuinely affect the landscape, the formations do not represent their original significance. Instead, the algorithm emphasizes numerical relationships that may be interpreted as meaningful connections between participants’ responses, reflecting the concept of apophenia.

Mimi Onuoha’s The Point of Collection provides another conceptual reference, particularly the decisions involved in collecting and representing data. By asking the user to summarize what gives their life meaning in a single word, the program applies limitations on the information it can collect. Personal experiences are reduced to brief summaries, and then numerical values. This process demonstrates how data collection is not entirely neutral, as the structure of the collection system determines which aspects of an experience can be preserved. While the actual word is stored in a dataset, its subjective significance is absent from the resulting representation, which instead emphasizes the numerical properties of the collected information.

As for the formal elements, the project uses Flask and Python to collect and store participants' responses in a JSON file. JavaScript receives the collected words and processes them through an algorithm that converts character codes into numerical values. These values determine the position, height, and width of the Gaussian mountains. The elevations of all the mountains are added together to make a continuous surface, which is rendered as multicolor wireframe with Three.JS. As more words are added, the landscape is transformed to include the transformations. Repeated words produce overlapping mountains, essentially making a specific point taller, causing certain responses to appear more prominently. The visual appearance of the project is inspired by scientific topographical visualizations, using a wireframe grid, colour dependent on elevation, and a 3D perspective.

# Screenshots

![1](screenshots/1.png)
![2](screenshots/2.png)
![3](screenshots/3.png)
![4](screenshots/4.png)
![5](screenshots/5.png)
