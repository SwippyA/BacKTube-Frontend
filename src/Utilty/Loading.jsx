import React from "react";

const Loading = () => {
  return (
    <div class="text-center">
      <div class="w-16 h-16 border-8  border-dashed rounded-full animate-spin border-purple-700 mx-auto"></div>
      <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
      <p class="text-zinc-600 dark:text-zinc-400">
        Videos That Inspire
      </p>
    </div>
  );
};

export default Loading;
