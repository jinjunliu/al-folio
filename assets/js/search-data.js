// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications by Jinjun Liu.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-presentations",
          title: "presentations",
          description: "Jinjun Liu&#39;s presentations.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/presentations/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Jinjun Liu&#39;s teaching activities at Texas A&amp;M University.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "My projects in one place.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Jinjun Liu&#39;s GitHub repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Jinjun Liu&#39;s CV.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "post-the-current-state-of-machine-learning-in-tropical-cyclone-research-2023-2024",
        
          title: "The Current State of Machine Learning in Tropical Cyclone Research (2023–2024)",
        
        description: "This article discusses the current state of machine learning in tropical cyclone research.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ai-in-tc-research/";
          
        },
      },{id: "post-building-your-own-ebook-library-with-calibre-web",
        
          title: "Building Your Own eBook Library with Calibre-Web",
        
        description: "This article shows you how to build your own eBook library with Calibre-Web.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/calibre-web-library/";
          
        },
      },{id: "post-python-visualization-plot-variables-on-maps-with-subplots",
        
          title: "Python Visualization: Plot Variables on Maps with Subplots",
        
        description: "Plotting variables on maps with subplots in Python.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/python-plot-map-subplots/";
          
        },
      },{id: "post-run-local-large-language-models",
        
          title: "Run Local Large Language Models",
        
        description: "Introduce `ollama`, `Enchanted`, and `OpenCat` to run large language models locally on MacOS.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/run-local-llm/";
          
        },
      },{id: "post-index-area-citation-error-of-microsoft-word",
        
          title: "Index Area Citation Error of Microsoft Word",
        
        description: "How to fix the error shown in Microsoft Word: Citation/Bibliography is wrongly placed in index area, please delete the placed citation/bibliography in index area.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/word-citation-error/";
          
        },
      },{id: "post-rime-input-method-on-macos",
        
          title: "Rime Input Method on MacOS",
        
        description: "This article explains how to set up the Rime input method on MacOS.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/rime-input/";
          
        },
      },{id: "post-using-unofficial-cloud-storage-to-sync-zotero-library",
        
          title: "Using Unofficial Cloud Storage to Sync Zotero Library",
        
        description: "This article explains how to use unofficial cloud storage (such as OneDrive) to sync the Zotero library.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/zotero-sync/";
          
        },
      },{id: "post-python-environment-management",
        
          title: "Python Environment Management",
        
        description: "This post mainly introduces how to use `conda` and `venv` to manage Python environments.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/python-env-manage/";
          
        },
      },{id: "post-installation-and-setup-of-centos-linux-server",
        
          title: "Installation and Setup of CentOS Linux Server",
        
        description: "This post documents some considerations during the installation of CentOS and provides instructions for post-installation setup, including software installation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/linux-server-setup/";
          
        },
      },{id: "post-example-of-using-wget",
        
          title: "Example of Using Wget",
        
        description: "This post provides examples of using Wget to download data from FTP sites.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/wget-usage/";
          
        },
      },{id: "books-python工匠",
          title: 'Python工匠',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/Python_Craftsman/";
            },},{id: "news-i-started-my-phd-at-texas-a-amp-amp-m-university",
          title: 'I started my PhD at Texas A&amp;amp;amp;M University.',
          description: "",
          section: "News",},{id: "news-i-passed-my-ph-d-qualifying-exam",
          title: 'I passed my Ph.D. qualifying exam.',
          description: "",
          section: "News",},{id: "news-i-passed-my-degree-preliminary-exam",
          title: 'I passed my degree preliminary exam.',
          description: "",
          section: "News",},{id: "news-i-had-my-first-oral-presentation-at-the-36th-conference-on-hurricanes-and-tropical-meteorology",
          title: 'I had my first oral presentation at the 36th Conference on Hurricanes and...',
          description: "",
          section: "News",},{id: "projects-deep-learning-for-filling-aerosol-data-gaps",
          title: 'Deep Learning for Filling Aerosol Data Gaps',
          description: "A ConvLSTM model for filling aerosol data gaps in the presence of cloud coverage.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/atmo-2023-dl-aerosol-gap/";
            },},{id: "projects-a-website-for-selling-used-cars",
          title: 'A Website for Selling Used Cars',
          description: "A PHP website utilizing MySQL database to perform used car selling functions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2019-db/";
            },},{id: "projects-ml-methods-to-predict-house-prices-in-los-angeles",
          title: 'ML Methods to Predict House Prices in Los Angeles',
          description: "Various machine learning methods to predict house prices in LA.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2019-dva/";
            },},{id: "projects-activity-classification-using-mhi",
          title: 'Activity Classification using MHI',
          description: "Implemented the methods to create Motion History Images (MHIs) and use these images to perform activity classification in a video.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2020-cv/";
            },},{id: "projects-an-android-app-word-find-game",
          title: 'An Android App: Word Find Game',
          description: "An Android game for users to choose letters from a randomly generated board to find words.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2020-sdp/";
            },},{id: "projects-deep-learning-methods-to-detect-hateful-memes",
          title: 'Deep Learning Methods to Detect Hateful Memes',
          description: "Developed an ensemble learning model based on VisualBERT to detect hateful memes in the Hateful Memes Challenge proposed by Facebook.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2021-dl/";
            },},{id: "projects-udacity-java-programming-nanodegree-projects",
          title: 'Udacity Java Programming Nanodegree Projects',
          description: "Projects I completed in the Udacity Java Programming Nanodegree.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cs-2022-udacity/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%6A%6C%69%75@%74%61%6D%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/jinjunliu", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/jinjun425", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jinjun-liu", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Jinjun-Liu-4/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
