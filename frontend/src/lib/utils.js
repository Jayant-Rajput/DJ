export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  export const formatMessageDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString(undefined, options)
  }
  