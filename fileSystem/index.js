// Import required modules
const fs = require("fs");
const path = require("path");

/**
 * Creates a folder at the specified path.
 * @param {string} folderPath - The path of the folder to be created.
 * @param {function} callback - Callback function to handle errors.
 */
function createFolder(folderPath, callback) {
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Creates a file with the specified name in the specified folder.
 * @param {string} folderPath - The path of the folder where the file will be created.
 * @param {string} fileName - The name of the file to be created.
 * @param {function} callback - Callback function to handle errors.
 */
function createFile(folderPath, fileName, callback) {
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Renames a folder.
 * @param {string} oldFolderPath - The current path of the folder to be renamed.
 * @param {string} newFolderPath - The new path for the folder.
 * @param {function} callback - Callback function to handle errors.
 */
function renameFolder(oldFolderPath, newFolderPath, callback) {
  fs.rename(oldFolderPath, newFolderPath, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Creates a table schema with the specified headings.
 * @param {string} folderPath - The path of the folder where the schema file will be created.
 * @param {string} fileName - The name of the schema file.
 * @param {Array<string>} headings - An array of table headings.
 * @param {function} callback - Callback function to handle errors.
 */
function createTableSchema(folderPath, fileName, headings, callback) {
  const filePath = path.join(folderPath, fileName);
  const schema = `| ${headings.join(" | ")} |\n`;

  fs.writeFile(filePath, schema, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Appends object data to a file based on the table schema.
 * @param {string} folderPath - The path of the folder where the file is located.
 * @param {string} fileName - The name of the file to which data will be appended.
 * @param {Array<Object>} dataArray - An array of objects containing data to append.
 * @param {Array<string>} headings - An array of table headings.
 * @param {function} callback - Callback function to handle errors.
 */
function appendObjectDataToFile(
  folderPath,
  fileName,
  dataArray,
  headings,
  callback
) {
  const filePath = path.join(folderPath, fileName);
  let tableData = "";

  dataArray.forEach((data) => {
    const rowData = `| ${headings
      .map((heading) => data[heading])
      .join(" | ")} |\n`;
    tableData += rowData;
  });

  fs.appendFile(filePath, tableData, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Renames a file.
 * @param {string} folderPath - The path of the folder where the file is located.
 * @param {string} oldFileName - The current name of the file to be renamed.
 * @param {string} newFileName - The new name for the file.
 * @param {function} callback - Callback function to handle errors.
 */
function renameFile(folderPath, oldFileName, newFileName, callback) {
  const oldFilePath = path.join(folderPath, oldFileName);
  const newFilePath = path.join(folderPath, newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Deletes a file.
 * @param {string} filePath - The path of the file to be deleted.
 * @param {function} callback - Callback function to handle errors.
 */
function deleteFile(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

/**
 * Deletes a folder and all its contents recursively.
 * @param {string} folderPath - The path of the folder to be deleted.
 */
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call if directory
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath); // Delete folder after all contents are deleted
  }
}

/**
 * Lists all files in a folder.
 * @param {string} folderPath - The path of the folder to list files from.
 * @param {function} callback - Callback function to handle the list of files or errors.
 */
function listFilesInFolder(folderPath, callback) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return callback(err);
    }
    // Filter out directories from the list
    const fileList = files.filter((file) =>
      fs.lstatSync(path.join(folderPath, file)).isFile()
    );
    callback(null, fileList);
  });
}

/**
 * Prints the content of a file.
 * @param {string} filePath - The path of the file to read.
 * @param {function} callback - Callback function to handle the file content or errors.
 */
function printFileContent(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

const folderPath = "./myFolder";
const newFolderPath = "./newFolder";
const fileName = "example.json";
const schemaHeadings = ["id", "name", "age", "department"];
const oldFileName = "example.txt";
const newFileName = "newExample.txt";

// Create a folder
createFolder(folderPath, (err) => {
  if (err) {
    console.error("Error creating folder:", err);
    return;
  }
  console.log("Folder created successfully!");
});

// Create a file
createFile(folderPath, fileName, (err) => {
  if (err) {
    console.error("Error creating file:", err);
    return;
  }
  console.log("File created successfully!");
});

// // Create table schema
createTableSchema(folderPath, fileName, schemaHeadings, (err) => {
  if (err) {
    console.error("Error creating table schema:", err);
    return;
  }
  console.log("Table schema created successfully!");
});

// // Rename the folder
renameFolder(folderPath, newFolderPath, (err) => {
  if (err) {
    console.error("Error renaming folder:", err);
    return;
  }
  console.log("Folder renamed successfully!");
});

// Append object data to file
const employee1 = { id: 1, name: "John", age: 30, department: "IT" };
const employee2 = { id: 2, name: "Jane", age: 25, department: "CT" };
appendObjectDataToFile(
  newFolderPath,
  fileName,
  [employee1, employee2], // Pass an array of objects
  schemaHeadings,
  (err) => {
    if (err) {
      console.error("Error appending object data to file:", err);
      return;
    }
    console.log("Object data appended to file successfully!");
  }
);

renameFile(folderPath, oldFileName, newFileName, (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully!");
});

const filePath = "./newFolder/newExample.txt";

deleteFile(filePath, (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully!");
});

deleteFolderRecursive(folderPath);

const folderPath2 = "./newFolder";

listFilesInFolder(folderPath2, (err, fileList) => {
  if (err) {
    console.error("Error listing files:", err);
    return;
  }
  console.log("Files in the folder:", fileList);
});

// const filePath = "./newFolder/example.txt";

printFileContent(filePath, (err, content) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("Content of the file:");
  console.log(content);
});
