#!/bin/bash

#inspired by https://github.com/devillex/wercker-ionic-package-step/blob/master/run.sh
cli="ionic"

main() {

	# Command
  cmd="package build"

  # Command arguments
  args="ios"

  if [ -z "$IONIC_PACKAGE_BUILD_PROFILE" ]; then
    fail "ionic-package: build profile cannot be empty"
  fi

	# release
  if [ "$IONIC_PACKAGE_BUILD_RELEASE" = "true" ]; then
    args="$args --release"
  fi

	# profile
  if [ -n "$IONIC_PACKAGE_BUILD_PROFILE" ]; then
    args="$args --profile \"$IONIC_PACKAGE_BUILD_PROFILE\""
  fi


  eval "$cli" "$cmd" "$args"
}


main;
