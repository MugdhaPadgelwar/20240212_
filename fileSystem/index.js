const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 * Asynchronously creates a folder with the specified name.
 * @param {string} folderName - The name of the folder to create.
 * @returns {Promise<void>} A Promise that resolves when the folder is
 *  created successfully or rejects with an error.
 */
async function createFolder(folderName) {
  try {
    await fs.mkdir(folderName, { recursive: true });

    console.log("Folder created successfully.");
  } catch (err) {
    // Check if folder already exists
    if (err.code === "EEXIST") {
      console.log("Folder already exists.");
    } else {
      // Handle other errors
      console.error("Error creating folder:", err);
    }
  }
}

/**
 * Creates an empty JSON file at the given file path.
 * @param {string} filePath - The path to the JSON file to create.
 */
async function createJSONFile(filePath) {
  try {
    // Check if the file already exists
    await fs.access(filePath);

    // If the file exists, log an error and return
    console.error("Error: File already exists");
    return;
  } catch (error) {
    console.log(error);
  }

  const jsonData = "{}"; // Empty JSON object

  try {
    await fs.writeFile(filePath, jsonData);
    console.log("JSON file created successfully.");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

/**
 * Asynchronously updates the name of a folder.
 * @param {string} oldName - The current name of the folder.
 * @param {string} newName - The new name for the folder.
 * @returns {Promise<void>} A Promise that resolves when the folder name is updated successfully or rejects with an error.
 */
async function updateFolderName(oldName, newName) {
  try {
    await fs.rename(oldName, newName);

    console.log("Folder name updated successfully.");
  } catch (err) {
    // Check if folder does not exist
    if (err.code === "ENOENT") {
      console.error("Folder not found.");
    } else {
      // Handle other errors
      console.error("Error updating folder name:", err);
    }
  }
}

/**
 * Asynchronously renames a file within a folder.
 * @param {string} folderPath - The path to the folder containing the file.
 * @param {string} oldFileName - The current name of the file.
 * @param {string} newFileName - The new name for the file.
 * @returns {Promise<void>} A Promise that resolves when the file is renamed successfully or rejects with an error.
 */
async function renameFileInFolder(folderPath, oldFileName, newFileName) {
  const oldFilePath = path.join(folderPath, oldFileName);
  const newFilePath = path.join(folderPath, newFileName);

  try {
    await fs.rename(oldFilePath, newFilePath);

    console.log("File renamed successfully.");
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error renaming file:", err);
    }
  }
}

/**
 * Asynchronously lists files in a folder.
 * @param {string} folderPath - The path to the folder.
 * @returns {Promise<void>} A Promise that resolves when the files are
 * listed successfully or rejects with an error.
 */
async function listFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);

    console.log("Files in folder:");
    files.forEach((file) => {
      console.log(file);
    });
  } catch (err) {
    // Check if folder does not exist
    if (err.code === "ENOENT") {
      console.error("Folder not found.");
    } else {
      // Handle other errors
      console.error("Error listing files:", err);
    }
  }
}

/**
 * Asynchronously reads a file in a folder.
 * @param {string} folderPath - The path to the folder containing the file.
 * @param {string} fileName - The name of the file to read.
 * @returns {Promise<void>} A Promise that resolves when the file
 * is read successfully or rejects with an error.
 */
async function readFileInFolder(folderPath, fileName) {
  const filePath = path.join(folderPath, fileName);

  try {
    const data = await fs.readFile(filePath, "utf8");

    console.log("Data in file:", data);
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error reading file:", err);
    }
  }
}

/**
 * Asynchronously deletes a folder and its contents recursively.
 * @param {string} folderPath - The path to the folder to delete.
 * @returns {Promise<void>} A Promise that resolves when the folder
 * is deleted successfully or rejects with an error.
 */
async function deleteFolder(folderPath) {
  try {
    await fs.rm(folderPath, { recursive: true });

    console.log("Folder deleted successfully.");
  } catch (err) {
    // Check if folder does not exist
    if (err.code === "ENOENT") {
      console.error("Folder not found.");
    } else {
      // Handle other errors
      console.error("Error deleting folder:", err);
    }
  }
}

/**
 * Asynchronously deletes a file within a folder.
 * @param {string} folderPath - The path to the folder containing the file.
 * @param {string} fileName - The name of the file to delete.
 * @returns {Promise<void>} A Promise that resolves when the file
 * is deleted successfully or rejects with an error.
 */
async function deleteFileInFolder(folderPath, fileName) {
  const filePath = path.join(folderPath, fileName);

  try {
    await fs.unlink(filePath);

    console.log("File deleted successfully.");
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error deleting file:", err);
    }
  }
}

/**
 * Asynchronously appends an object to a JSON file.
 * @param {Object} objectData - The object to append to the JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<void>} A Promise that resolves when the object is appended successfully or rejects with an error.
 */
async function appendObjectToJSONFile(objectData, filePath) {
  // Generate a UUID for the object
  const uuid = uuidv4();
  const objectWithDataAndUUID = { ...objectData, uuid }; // Include UUID in object data

  try {
    const data = await fs.readFile(filePath, "utf8");
    let existingData = [];

    try {
      existingData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return;
    }

    // If the existing data is not an array, create one
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    existingData.push(objectWithDataAndUUID);

    const jsonData = JSON.stringify(existingData, null, 2);

    await fs.writeFile(filePath, jsonData);

    console.log("Object appended to JSON file successfully.");
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error appending object to JSON file:", err);
    }
  }
}

/**
 * Asynchronously retrieves data by UUID from a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @param {string} targetUUID - The UUID of the object to retrieve.
 * @returns {Promise<Object|null>} A Promise that resolves with the object if found, or null if not found or if an error occurs.
 */
async function getDataByUUID(filePath, targetUUID) {
  try {
    // Read data from JSON file
    const data = await fs.readFile(filePath, "utf8");

    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Find object with specified UUID
    const targetObject = jsonData.find((obj) => obj.uuid === targetUUID);

    // If object not found, throw an error
    if (!targetObject) {
      throw new Error("Object with specified UUID not found.");
    }

    // Return the found object
    return targetObject;
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error:", err.message);
    }
    return null; // Return null if an error occurs
  }
}

/**
 * Asynchronously deletes data by UUID from a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @param {string} targetUUID - The UUID of the object to delete.
 * @returns {Promise<void>} A Promise that resolves when the data is
 *  deleted successfully or rejects with an error.
 */
async function deleteDataByUUID(filePath, targetUUID) {
  try {
    // Read data from JSON file
    let data = await fs.readFile(filePath, "utf8");

    // Parse JSON data
    let jsonData = JSON.parse(data);

    // Filter out object with specified UUID
    let updatedData = jsonData.filter((obj) => obj.uuid !== targetUUID);

    // Write updated data to JSON file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    console.log("Data deleted successfully.");
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error deleting data:", err);
    }
  }
}

/**
 * Asynchronously updates data by UUID in a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @param {string} targetUUID - The UUID of the object to update.
 * @param {Object} newData - The new data to update.
 * @returns {Promise<void>} A Promise that resolves when the data
 *  is updated successfully or rejects with an error.
 */
async function updateDataByUUID(filePath, targetUUID, newData) {
  try {
    // Read data from JSON file
    let data = await fs.readFile(filePath, "utf8");

    // Parse JSON data
    let jsonData = JSON.parse(data);

    // Update data based on UUID
    let updatedData = jsonData.map((obj) => {
      if (obj.uuid === targetUUID) {
        return { ...obj, ...newData };
      }
      return obj;
    });

    // Write updated data to JSON file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    console.log("Data updated successfully.");
  } catch (err) {
    // Check if file does not exist
    if (err.code === "ENOENT") {
      console.error("File not found.");
    } else {
      // Handle other errors
      console.error("Error updating data:", err);
    }
  }
}

let userOne = { name: "Mugdha", age: 21, city: "Nagpur" };
let userTwo = { name: "Mansi", age: 25, city: "Kochi" };
let userThree = { name: "Mitali", age: 20, city: "Banglore" };

// Example usage:
// createFolder("myFolder");
// createJSONFile("./myFolder/data.json");
// appendObjectToJSONFile(userThree, "./myFolder/data.json");
// updateFolderName("./myFolder", "./newFolder");
// renameFileInFolder("./newFolder", "data.json", "dataaa.json");
// listFilesInFolder("./newFolder");
// readFileInFolder("./newFolder", "dataaa.json");
// deleteFolder("./newFolder");
// deleteFileInFolder("./newFolder", "dataaa.json");
// getDataByUUID(
//   "./newFolder/dataaa.json",
//   "fc345e52-a208-46de-85f1-6584a6f467fc"
// );
// deleteDataByUUID("./newFolder/dataaa.json", "fc345e52-a208-46de-85f1-6584a6f467fc");
// updateDataByUUID("./newFolder/dataaa.json", "69fac8cf-69fa-443f-b6a7-d7dcb820e0f7", { name: "Mugdha", age: 35, city: "Hyderabad" });
