exports.sendFileUploadedNotification = (file, io) => {
    io.emit('fileUploaded', file);
  };
  