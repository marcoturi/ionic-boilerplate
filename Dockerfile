FROM     ubuntu:14.04.4
MAINTAINER marco [dot] turi [at] hotmail [dot] it

# Inspired by:
# https://hub.docker.com/r/webnicer/protractor-headless/~/dockerfile/
# https://github.com/agileek/docker
# http://stackoverflow.com/questions/29558444/angularjs-grunt-bower-gitlab-ci-setup-for-testing
# https://github.com/tippiq/docker-protractor

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NODE_VERSION=6.6.0 \
    NPM_VERSION=3.10.3 \
    IONIC_VERSION=2.1.0 \
    CORDOVA_VERSION=5.3.1 \
    # Fix for the issue with Selenium, as described here:
    # https://github.com/SeleniumHQ/docker-selenium/issues/87
    DBUS_SESSION_BUS_ADDRESS=/dev/null

# Install basics
RUN apt-get update &&  \
    apt-get install -y git wget curl unzip ruby build-essential xvfb && \
    curl --retry 3 -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
    npm install -g npm@"$NPM_VERSION" && \
    npm install -g  cordova@"$CORDOVA_VERSION" ionic@"$IONIC_VERSION" && \
    npm cache clear && \
    gem install sass && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    apt-get clean && \
    rm google-chrome-stable_current_amd64.deb && \
    mkdir Sources && \

# Font libraries
    apt-get -qqy install fonts-ipafont-gothic xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable ttf-ubuntu-font-family libfreetype6 libfontconfig && \

# install python-software-properties (so you can do add-apt-repository)
    apt-get update && apt-get install -y -q python-software-properties software-properties-common  && \
    add-apt-repository ppa:webupd8team/java -y && \
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
    apt-get update && apt-get -y install oracle-java7-installer && \

# Ruby
    apt-add-repository ppa:brightbox/ruby-ng -y && \
    apt-get update && apt-get install -y -q ruby2.2 && \

#ANDROID STUFF
    echo ANDROID_HOME="${ANDROID_HOME}" >> /etc/environment && \
    dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y --force-yes expect ant wget libc6-i386 lib32stdc++6 lib32gcc1 lib32ncurses5 lib32z1 qemu-kvm kmod && \
    apt-get clean && \
    apt-get autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \

# Install Android SDK
    cd /opt && \
    wget --output-document=android-sdk.tgz --quiet http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz && \
    tar xzf android-sdk.tgz && \
    rm -f android-sdk.tgz && \
    chown -R root. /opt

# Setup environment
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools:/opt/tools

# Install sdk elements
COPY sh /opt/tools

RUN ["/opt/tools/android-accept-licenses.sh", "android update sdk --all --no-ui --filter platform-tools,tools,build-tools-23.0.2,android-23,extra-android-support,extra-android-m2repository,extra-google-m2repository"]
RUN unzip ${ANDROID_HOME}/temp/*.zip -d ${ANDROID_HOME}

WORKDIR Sources
EXPOSE 8100 35729
CMD ["ionic", "serve"]
