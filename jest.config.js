module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  //   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
