Fayde Generator
===============

Yeoman generator for Fayde Applications.

Install `generator-fayde` globally.

  ```npm install -g generator-fayde```

### Generate Fayde Application

```
# Create a directory and scaffold
$ mkdir <new directory>
$ cd <new directory>
$ yo fayde

# Launch
$ grunt serve
```

### Generate View Model

```
# Create a view model named TestViewModel in ViewModels directory.
$ yo fayde:vm Test
```

### Generate Page

Issue the following command to create a page called "Home" with a Title of "Page Title". Generator will place page in the Views directory.

```
# Create a page with title "Page Title" in Views directory.
$ yo fayde:page Home "Page Title"
```

### Generate View

Issue the following command to create a XAML view called "Testing".  Generator will prompt for root UIElement to use and place in the Views directory.

```
# Create a xaml view named Testing in Views directory.
# You will be prompted for root UIElement type.
$ yo fayde:view Testing
```
