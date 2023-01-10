---
title: 'Slack to Notion translator'
socialImage: images/slack-notion-translator.png
date: '2021-09-10'
tags:
  - project
  - javascript
summary: "Notion has a very interesting way of setting up their pages, formatting their text, and creating items, and that happens to be very different than Slack's approach. By taking examples of text from both APIs, I was able to set up a translator between Slack and Notion. This blog post walks you through how I did it!"
---

### TLDR:

Notion has a very interesting way of setting up their pages, formatting their text, and creating items, and that happens to be very different than Slack's approach. By taking examples of text from both APIs, I was able to set up a translator between Slack and Notion. This blog post walks you through how I did it, but you can also just check out the project on [GitHub](https://github.com/victoriaslocum752/slack-notion-translation). 

---

## Translating Slack to Notion

So far, the code only translates Slack to Notion, but hopefully sometime soon it will be able to translate Notion to Slack messages. For now, I'll walk you through how I set it up. 

For testing, we're going to be using this example message from Slack. There is various text formatting in the item, like line breaks, [links](http://endless.horse/), tagged users, emojis 🐿️, `code`, **bold,** *italic,* and bullet points. The only thing Notion does inherently is the bullet points and numbered lists. 

![Untitled](images/slack-notion-translator-1.png)

```jsx
// example message from Slack
const slackExample =
  'Hi this is a message with:\n' +
  '\n' +
  '• *bold*, _italic_, and `code` , along with <http://endless.horse/|links> and emojis :potato: :shrimp: :wave: \n' +
  '• and tagged users like HEY <@U0185FAF1T5> ';
```

Notion items work in blocks, so here's that same message in Notion with the json object. The main blocks are split by line breaks and within that the arrays are based on the text type. 

![Untitled](images/slack-notion-translator-2.png)

```jsx
[ { type: 'text', text: { content: 'Hi this is a message with:' } } ]
[
  { type: 'text', text: { content: '• ' } },
  {
    type: 'text',
    text: { content: 'bold' },
    annotations: { bold: true }
  },
  { type: 'text', text: { content: ', ' } },
  {
    type: 'text',
    text: { content: 'italic' },
    annotations: { italic: true }
  },
  { type: 'text', text: { content: ', and ' } },
  {
    type: 'text',
    text: { content: 'code' },
    annotations: { code: true }
  },
  { type: 'text', text: { content: ' , along with ' } },
  { type: 'text', text: { content: 'links', link: [Object] } },
  { type: 'text', text: { content: ' and emojis 🥔 🦐 👋 ' } }
]
[
  { type: 'text', text: { content: '• and tagged users like HEY ' } },
  { type: 'mention', mention: { type: 'user', user: [Object] } },
  { type: 'text', text: { content: ' ' } }
]
```

### Step 1: Set up

In your main folder, initialize a `package.json` with the following dependencies and an `main.js` . Then go ahead and `npm install` in the terminal. 

```json
{
    "name": "slack-notion-translation",
    "type": "module",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
        "start": "node main.js",
        "dev": "nodemon main.js"
    },
    "dependencies": {
        "he": "^1.2.0"
    }
}
```

If you want tags for people to work in Notion, the first thing you're going to need is a Slack ID to Notion ID dictionary. To figure out how to do that, you can go to [this post](https://dev.to/victoriaslocum/how-to-find-non-admin-notion-user-ids-5277). Your table should look like this, with the Slack ID as the key and the Notion ID as the value. 

```jsx
// Slack user ID to Notion user ID dictionary
const slackNotionId = {
  UT9G67J1Z: "f2ca3fc5-9ca1-46ed-be8b-fb618c56558a",
  U0185FAF1T5: "6718f0c7-f6e3-4c3a-9f65-e8344806b5b6",
  U025P5K0S0Z: "6f7ce62c-fa2e-4440-8805-72af5f937666",
  U021UR4DW5C: "8fd7689c-d795-4ae9-aa53-5846ac1569b7",
  U0224KFNYRW: "7c02e0ba-2aec-4696-a91d-ecaa01b616ce",
  U025J9SLXV3: "94f6b8b7-e8b0-4790-8265-f08e6b1d550c",
  UT9G67YFM: "6c3a6ec1-4b99-4e5c-8214-cea14fd9b142",
};
```

The next thing we need to do is install and import `he` in order for us to change HTML emoji codes into the actual emoji item and import `fs` so we can read other files. You can download `he` through the `npm install he` command in the terminal. 

```jsx
import he from "he";
import fs from "fs";
```

Next we need to set up the files for the emoji dictionary. You can find the dictionary I used [here](https://gist.github.com/nickgrealy/f3f27874d306a5d5048f02f0d3e14c07), and I downloaded that file into my main directory. This will allow us to translate the Slack emojis to HTML. 

```jsx
// import slack to html emoji dictionary
let rawdata = fs.readFileSync("./slack_emoticons_to_html_unicode.json");
let emojis = JSON.parse(rawdata);
```

Great! Now we're set up, and we can move on to the translation functions. 

### Step 2: Convert a parsed Slack item to Notion

These functions will allow for text of a singular type to be translated into a Notion item. For example, Notion recognizes `code` as a separate string than regular text, so `code` has to be extracted and made into its own array. These functions properly format the text type so then we can make a larger Notion item. 

Here's the function for translating emojis. By splitting the string by the spaces, we can isolate the emojis, and then detect them through the ":". Once we find an emoji, we can find the HTML value from the Slack key, and `he.decode()` allows us to decode the translated HTML into the emoji. 

```jsx
// replace the emojis codes (from Slack) in the text with actual emojis
const replaceEmojis = (string) => {
  // split string based on words
  var splitString = string.split(" ");

  // for each word in the string:
  // see if the word has the emoji marker ":"
  // search keys in the emoji for the word
  // replace the word with the decoded html value
  splitString.forEach((word) => {
    if (word.search(":") != -1) {
      for (var key in emojis) {
        if (word.search(":" + key + ":") != -1) {
          string = string.replace(key, he.decode(emojis[key]));

          // replace all the ":" in the string and return
          string = string.replace(/:/gi, "");
        }
      }
    }
  });
  return string;
};
```

The following items are for the various other types of formatting. In all instances, the function returns the created Notion array. 

```jsx
// create a new Notion block item for links
const newLinkItem = (plainText, link) => {
  var array = {
    type: "text",
    text: {
      content: plainText,
      link: {
        type: "url",
        url: link,
      },
    },
  };
  return array;
};

// create a new Notion block item for text
const newTextItem = (text) => {
  var array = {
    type: "text",
    text: {
      content: text,
    },
  };
  return array;
};

// create a new Notion block item for users
const newUserItem = (slackUserID) => {
  var array = {
    type: "mention",
    mention: {
      // find the user's Notion ID from the Slack ID and the dictionary 
      type: "user",
      user: { id: slackNotionId[slackUserID] },
    },
  };
  return array;
};

// create a new Notion block item for code
const newCodeItem = (codeText) => {
  var array = {
    type: "text",
    text: {
      content: codeText,
    },
    annotations: {
      code: true,
    },
  };
  return array;
};

// create a new Notion block item for bold text
const newBoldItem = (boldText) => {
  var array = {
    type: "text",
    text: {
      content: boldText,
    },
    annotations: {
      bold: true,
    },
  };
  return array;
};

// create a new Notion block item for code text
const newItalicItem = (italicText) => {
  var array = {
    type: "text",
    text: {
      content: italicText,
    },
    annotations: {
      italic: true,
    },
  };
  return array;
};

// create a new Notion block item for strikethrough text
const newStrikeItem = (strikeText) => {
  var array = {
    type: "text",
    text: {
      content: strikeText,
    },
    annotations: {
      strikethrough: true,
    },
  };
  return array;
};
```

Ok, now that we've gotten that out of the way, the real fun starts. 

### Step 3: Creating the block child

Notion sets up their line breaks through creating new child blocks. So for each line in the text, we'll have to parse it accordingly to fit in each of the functions described above. 

Lets start by creating the function and setting up the main variable. The function takes in a split array based on the regex expression `/[\<\>]/`, which splits the item in every instance of '<' and '>'. This is to capture the links and tagged user items, which are formatted like `<http://endless.horse/|links>` and `<@UT9G67YFM>` respectively. 

```jsx
// create a new child of a page with different blocks
const newChild = (splitItem) => {
	// create the Item
  var notionItem = [];

	// more code to come
}
```

Next, we'll create a `.forEach()` for each line in the inputted split array. In this `.forEach()`, we'll have a few if statements to capture all the different types. 

```jsx
splitItem.forEach((item) => {
	// if statements here
}
```

Lets start with the links. First, we'll search for the link markers, both email links and webpage links. Then, we'll split based off of the "|" separating the text from the link. This will create an array with the link in the first item and the text in the second item, which then we can create an item with and push that item to the Notion item array. 

```jsx
if ((item.search(/https?/) != -1) | (item.search(/mailto/) != -1)) {
  // see if its a link item by searching for link text indicators

  // split link into text and link
  let linkSplit = item.split("|");

  // create link item and push to notionItem
  const linkItem = newLinkItem(linkSplit[1], linkSplit[0]);
  notionItem.push(linkItem);
}
```

Our next search will be for users. We can find them through "@", which we'll get rid of. If that item is somewhere in the dictionary of Slack IDs, then we'll continue with the user item. If its not, we'll just make it a text item with the original item text. 

```jsx
else if (item.search("@") != -1) {
  // see if it is a user by searching for the @ symbol

  // replace indicator symbol
  var string = item.replace("@", "");

  // check if the string is in the table, if not just push the string as a text item
  if (string in slackNotionId) {
    // create a new user item and push to notionItem
    const userItem = newUserItem(string, slackNotionId);
    notionItem.push(userItem);
  } else {
    const textItem = newTextItem(item);
    notionItem.push(textItem);
  }
}
```

This part is a little bit trickier. We've got to search to see if there's any indication of all the other text formatting options and then if there is, split that text and give the correct functions the correct items. 

Lets set up the if statement first then go from there. 

```jsx
else if (item.search(/[\`\_\*\~]/) != -1) {
	// if a string contains any special annotations (bold, italic, code, strikethrough)
	
	// replace any emojis in string
	item = replaceEmojis(item);
	
	// more stuff to come here
	
}
```

Next, regex. The way I did this is kind of weird, but basically I didn't want to get rid of the markers but still wanted to split the text. My solution was to add an "=" before and after the word, so `*bold*` would turn into `=*bold*=`. Then, we can split based off all the "=" and not lose the original formatting. If there's a better solution to this, please let me know 😆. 

```jsx
// kinda wack, but replace all the symbols with = on either end
// so it can break without getting rid of the original symbol
item = item.replace(/[\*](?=[a-zA-Z0-9])/, "=*");
item = item.replace(/(?<=[a-zA-Z0-9,])[\*]/, "*=");
item = item.replace(/[\`](?=[a-zA-Z0-9])/, "=`");
item = item.replace(/(?<=[a-zA-Z0-9,])[\``]/, "`=");
item = item.replace(/[\_](?=[a-zA-Z0-9])/, "=_");
item = item.replace(/(?<=[a-zA-Z0-9,])[\_]/, "_=");
item = item.replace(/[\~](?=[a-zA-Z0-9])/, "=~");
item = item.replace(/(?<=[a-zA-Z0-9,])[\~]/, "~=");

// split item based off of =
var split = item.split(/\=/gi);
```

This will give us an array that is split based on all of the types of text! Next we'll use a series of if statements to see what type it is, and then translate the type and push it to the Notion item. 

```jsx
// for each item, check to see what type it is, replace the indicator, and push to notionItem
split.forEach((split) => {
  if (split.search("`") != -1) {
    split = split.replace(/\`/gi, "");
    const item = newCodeItem(split);
    notionItem.push(item);
  } else if (split.search("_") != -1) {
    split = split.replace(/\_/gi, "");
    const item = newItalicItem(split);
    notionItem.push(item);
  } else if (split.search(/[\*]/) != -1) {
    split = split.replace(/\*/gi, "");
    const item = newBoldItem(split);
    notionItem.push(item);
  } else if (split.search("~") != -1) {
    split = split.replace(/\~/gi, "");
    const item = newStrikeItem(split);
    notionItem.push(item);
  } else {
    const textItem = newTextItem(split);
    notionItem.push(textItem);
  }
});
```

Ok, that's done, now we can move back to the original if statement with a final `else` to capturing any remaining text. 

```jsx
else {
  // if the string is normal, then replace emojis and push text item
  var string = replaceEmojis(item);
  const textItem = newTextItem(string);
  notionItem.push(textItem);
}
```

Then we can just return the Notion item at the end, and tada 🎉! Here's the complete function. 

```jsx
// create a new child of a page with different blocks
const newChild = (splitItem) => {
  // create the Item
  var notionItem = [];

  // the input is a split item based on (/[\<\>]/), and then for each item
  // both links and users are indicated by <text>
  splitItem.forEach((item) => {
    if ((item.search(/https?/) != -1) | (item.search(/mailto/) != -1)) {
      // see if its a link item by searching for link text indicators

      // split link into text and link
      let linkSplit = item.split("|");

      // create link item and push to notionItem
      const linkItem = newLinkItem(linkSplit[1], linkSplit[0]);
      notionItem.push(linkItem);
    } else if (item.search("@") != -1) {
      // see if it is a user by searching for the @ symbol

      // replace indicator symbol
      var string = item.replace("@", "");

      // create a new user item and push to notionItem
      const userItem = newUserItem(string);
      notionItem.push(userItem);
    } else if (item.search(/[\`\_\*\~]/) != -1) {
      // if a string contains any special annotations (bold, italic, code, strikethrough)

      // replace any emojis in string
      item = replaceEmojis(item);

      // kinda wack, but replace all the symbols with = on either end
      // so it can break without getting rid of the original symbol
      item = item.replace(/[\*](?=[a-zA-Z0-9])/, "=*");
      item = item.replace(/(?<=[a-zA-Z0-9,])[\*]/, "*=");
      item = item.replace(/[\`](?=[a-zA-Z0-9])/, "=`");
      item = item.replace(/(?<=[a-zA-Z0-9,])[\``]/, "`=");
      item = item.replace(/[\_](?=[a-zA-Z0-9])/, "=_");
      item = item.replace(/(?<=[a-zA-Z0-9,])[\_]/, "_=");
      item = item.replace(/[\~](?=[a-zA-Z0-9])/, "=~");
      item = item.replace(/(?<=[a-zA-Z0-9,])[\~]/, "~=");

      // split item based off of =
      var split = item.split(/\=/gi);

      // for each item, check to see what type it is, replace the indicator, and push to notionItem
      split.forEach((split) => {
        if (split.search("`") != -1) {
          split = split.replace(/\`/gi, "");
          const item = newCodeItem(split);
          notionItem.push(item);
        } else if (split.search("_") != -1) {
          split = split.replace(/\_/gi, "");
          const item = newItalicItem(split);
          notionItem.push(item);
        } else if (split.search(/[\*]/) != -1) {
          split = split.replace(/\*/gi, "");
          const item = newBoldItem(split);
          notionItem.push(item);
        } else if (split.search("~") != -1) {
          split = split.replace(/\~/gi, "");
          const item = newStrikeItem(split);
          notionItem.push(item);
        } else {
          const textItem = newTextItem(split);
          notionItem.push(textItem);
        }
      });
    } else {
      // if the string is normal, then replace emojis and push text item
      var string = replaceEmojis(item);
      const textItem = newTextItem(string);
      notionItem.push(textItem);
    }
  });
  console.log(notionItem);
  return notionItem;
};
```

The final function will be creating a Notion item! This will take in a Slack message and convert it to Notion. 

```jsx
const newNotionItem = (slackMessage) => {
	// stuff goes here
}
```

First, we'll make an empty block if you wanted to include spacing. 

```jsx
// empty block for spacing
  const emptyBlock = {
    object: "block",
    type: "paragraph",
    paragraph: {
      text: [
        {
          type: "text",
          text: {
            content: "",
          },
        },
      ],
    },
  };
```

Next, we'll make the item before hand, just like the `newChild()` function, and split the message based on line breaks. The `.filter(Boolean)` is just to get rid of the empty items in the array. 

```jsx
// notion Item
const notionItem = [];

// split message on line breaks and filter empty lines
var newLineSplit = slackMessage.split("\n");
newLineSplit = newLineSplit.filter(Boolean);
```

Then, for each line in the Slack message, we will split it based on the link and user indicators of "<>" and make a new child with that split item. We'll make a block from that child text, and push that to the Notion item. 

```jsx
// for each line in Slack message
newLineSplit.forEach((line) => {
  // split line based on link/user indicators
  var regex = new RegExp(/[\<\>]/);
  var split = line.split(regex);

  // create new child item content
  var item = newChild(split);
  // add child item content to formatted block
  const childBlock = {
    object: "block",
    type: "paragraph",
    paragraph: { text: item },
  };

  // push child to notionItem
  notionItem.push(childBlock);
});
```

Finally, we'll push an empty block and return the Notion item. This is the whole function. 

```jsx
// create a new Notion item
const newNotionItem = (slackMessage) => {
  // empty block for spacing
  const emptyBlock = {
    object: "block",
    type: "paragraph",
    paragraph: {
      text: [
        {
          type: "text",
          text: {
            content: "",
          },
        },
      ],
    },
  };

  // notion Item
  const notionItem = [];

  // split message on line breaks and filter empty lines
  var newLineSplit = slackMessage.split("\n");
  newLineSplit = newLineSplit.filter(Boolean);

  // for each line in Slack message
  newLineSplit.forEach((line) => {
    // split line based on link/user indicators
    var regex = new RegExp(/[\<\>]/);
    var split = line.split(regex);

    // create new child item content
    var item = newChild(split);
    // add child item content to formatted block
    const childBlock = {
      object: "block",
      type: "paragraph",
      paragraph: { text: item },
    };

    // push child to notionItem
    notionItem.push(childBlock);
  });

  // add an empty block for spacing and return
  notionItem.push(emptyBlock);
  console.log(notionItem);
  return notionItem;
};
```

And that's it! The `newNotionItem` function will return something that looks like this:

```jsx
[
  { object: 'block', type: 'paragraph', paragraph: { text: [Array] } },
  { object: 'block', type: 'paragraph', paragraph: { text: [Array] } },
  { object: 'block', type: 'paragraph', paragraph: { text: [Array] } },
  { object: 'block', type: 'paragraph', paragraph: { text: [Array] } }
]
```

 

This is all the arrays in the text field:

```jsx
[ { type: 'text', text: { content: 'Hi this is a message with:' } } ]
[
  { type: 'text', text: { content: '• ' } },
  {
    type: 'text',
    text: { content: 'bold' },
    annotations: { bold: true }
  },
  { type: 'text', text: { content: ', ' } },
  {
    type: 'text',
    text: { content: 'italic' },
    annotations: { italic: true }
  },
  { type: 'text', text: { content: ', and ' } },
  {
    type: 'text',
    text: { content: 'code' },
    annotations: { code: true }
  },
  { type: 'text', text: { content: ' , along with ' } },
  { type: 'text', text: { content: 'links', link: [Object] } },
  { type: 'text', text: { content: ' and emojis 🥔 🦐 👋 ' } }
]
[
  { type: 'text', text: { content: '• and tagged users like HEY ' } },
  { type: 'mention', mention: { type: 'user', user: [Object] } },
  { type: 'text', text: { content: ' ' } }
]
```

This project was a bit of a whirlwind, but overall very helpful to me. 

## Known Issues 🐄

- if you do multiple annotations to the same text, like bold and italic at the same time, it will pretty much completely break. This can be solved by adding new functions and parsing with the proper format
- if you have some sort of file or image, it won't add it to Notion (Notion doesn't support inputting files at this time)
- different block types, like code blocks or quote blocks, won't work (Notion doesn't support yet)
- tagging @channel or @here won't work with this because Slack has different formatting, but that can be fixed by adding replacement values. The formatting for those is <!channel> or <!here>.

As always, had so much fun learning with this project. This was part of a larger project, which you can find on [GitHub](https://github.com/victoriaslocum752/standup-integration) and the blog. 

The GitHub for this project is [here](https://github.com/victoriaslocum752/slack-notion-translation). 

Hope to see you around here again soon! ✌️