# Adding Ballerina to Environment Variables

## Step 1: Find Your Ballerina Installation Directory

1. First, locate where Ballerina is installed on your system
   - Typically at `C:\Program Files\Ballerina\<version>` or wherever you chose to install it
   - Note the full path to the `bin` directory (e.g., `C:\Program Files\Ballerina\2201.7.0\bin`)

## Step 2: Add Ballerina to PATH

1. Press the **Windows key + X**
2. Select **System**
3. Click on **Advanced system settings** on the right panel
4. In the System Properties window, click on the **Environment Variables** button
5. In the Environment Variables window, under **System variables**, find and select the **Path** variable
6. Click **Edit**
7. Click **New** to add a new entry
8. Enter the full path to your Ballerina bin directory (e.g., `C:\Program Files\Ballerina\2201.7.0\bin`)
9. Click **OK** on all dialogs to save your changes

## Step 3: Verify the Setup

1. **Close and reopen** your PowerShell or Command Prompt window
2. Type `bal --version` and press Enter
3. You should now see the Ballerina version information

## Alternative: Using the Run Command Directly

If you don't want to modify your PATH or are having trouble, you can run Ballerina directly using its full path:

```powershell
& "C:\Program Files\Ballerina\2201.7.0\bin\bal.exe" run
```

Make sure to adjust the path to where Ballerina is actually installed on your system.

## Running Your Application

Once Ballerina is in your PATH or you're using the direct path method:

1. Navigate to your project directory:
   ```
   cd F:\hackthon\Ballerina\Healthcare\Healthcare
   ```

2. Run your application:
   ```
   bal run
   ```
   
   Or with the direct path method:
   ```
   & "C:\Program Files\Ballerina\2201.7.0\bin\bal.exe" run
   ```
