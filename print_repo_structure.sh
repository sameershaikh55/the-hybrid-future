#!/bin/bash

# Change the path below to the root directory of your repo
repo_root="."

# Print file structure
function print_structure() {
  local dir_path=$1
  local indent=$2

  for entry in "$dir_path"/*; do
    if [ -d "$entry" ]; then
      # If it's a directory, check if it's node_modules, dist, or .next
      local dir_name="$(basename "$entry")"
      if [ "$dir_name" != "node_modules" ] && [ "$dir_name" != "dist" ] && [ "$dir_name" != ".next" ]; then
        # Print the directory name and call the function recursively
        printf "${indent}📁 %s\n" "$dir_name"
        print_structure "$entry" "  $indent"
      fi
    elif [ -f "$entry" ]; then
      # If it's a file, print the file name
      printf "${indent}📄 %s\n" "$(basename "$entry")"
    fi
  done
}

# Call the print_structure function with the root directory
print_structure $repo_root ""
