Fayde Generator
===============

Yeoman generator for Fayde

Install `generator-fayde`

  ```npm install -g generator-fayde```

### Generate Fayde Application
  
Create a directory for a new Fayde application and scaffold:

```
mkdir <new directory name>
cd <new directory name>
yo fayde
```

When completed, you can run the following to launch the application.

  ```grunt serve```

### Generate View Model

Issue the following command to create a view model called "TestViewModel".  Generator will place view model in the ViewModels directory.

```yo fayde:vm Test```

### Generate Page

Issue the following command to create a page called "Home" with a Title of "Page Title". Generator will place page in the Views directory.

```yo fayde:page Home "Page Title"```

### Generate View

Issue the following command to create a XAML view called "Testing".  Generator will prompt for root UIElement to use and place in the Views directory.

```yo fayde:view Testing```
