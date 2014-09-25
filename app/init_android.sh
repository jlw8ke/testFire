#!/bin/sh

name=$1
path=$2
package=$3
target=$4
min_target=$5
activity=$6

android create project --name $name --path $path --package $package --target $target --activity $activity -g -v 0.12.2

# Fetch current gradle template
git clone -q git@github.com:Mobiquity/Mobsource_GradleTemplate_Android.git

cp Mobsource_GradleTemplate_Android/settings.gradle $path/
cp Mobsource_GradleTemplate_Android/.gitignore $path/
cp Mobsource_GradleTemplate_Android/build.gradle $path/
cp -r Mobsource_GradleTemplate_Android/scripts $path/scripts
echo "creating app module"
mkdir $path/app
mv $path/src $path/app/
cp Mobsource_GradleTemplate_Android/app/build.gradle $path/app/
cp Mobsource_GradleTemplate_Android/app/.gitignore $path/app/

echo "configuring gradle.properties"
FILE=$path/gradle.properties
sdk_version=${target:8}
min_sdk_version=${min_target:8}
echo "APPLICATION_ID=$package" >> $FILE
echo "ANDROID_BUILD_MIN_SDK_VERSION=$min_sdk_version" >> $FILE
echo "ANDROID_BUILD_TARGET_SDK_VERSION=$sdk_version" >> $FILE
echo "ANDROID_BUILD_TOOLS_VERSION=20.0.0" >> $FILE
echo "ANDROID_BUILD_SDK_VERSION=$sdk_version" >> $FILE

rm -rf Mobsource_GradleTemplate_Android
