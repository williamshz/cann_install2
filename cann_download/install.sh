#!/bin/bash

set -e

CANN_VERSION="6.5.0"
INSTALL_DIR="/usr/local/Ascend"
DOWNLOAD_URL="https://ascend-repo.huawei.com/CANN/$CANN_VERSION"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [ "$(id -u)" != "0" ]; then
        print_error "请以root用户身份运行此脚本"
        print_info "使用: sudo ./install.sh"
        exit 1
    fi
}

check_os() {
    print_info "检查操作系统..."
    if [ -f /etc/centos-release ]; then
        OS="centos"
        OS_VERSION=$(cat /etc/centos-release | grep -oE '[0-9]+\.[0-9]+' | head -1)
        print_info "检测到 CentOS $OS_VERSION"
    elif [ -f /etc/os-release ]; then
        if grep -q "Ubuntu" /etc/os-release; then
            OS="ubuntu"
            OS_VERSION=$(grep VERSION_ID /etc/os-release | cut -d'"' -f2)
            print_info "检测到 Ubuntu $OS_VERSION"
        elif grep -q "openEuler" /etc/os-release; then
            OS="openeuler"
            OS_VERSION=$(grep VERSION_ID /etc/os-release | cut -d'"' -f2)
            print_info "检测到 openEuler $OS_VERSION"
        fi
    else
        print_error "不支持的操作系统"
        exit 1
    fi
}

check_dependencies() {
    print_info "检查依赖项..."
    
    local deps=("wget" "tar" "gzip" "python3" "gcc" "g++")
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            print_warn "$dep 未安装，正在安装..."
            if [ "$OS" = "centos" ] || [ "$OS" = "openeuler" ]; then
                yum install -y "$dep"
            elif [ "$OS" = "ubuntu" ]; then
                apt-get update && apt-get install -y "$dep"
            fi
        else
            print_info "$dep 已安装"
        fi
    done
}

download_cann() {
    print_info "下载 CANN $CANN_VERSION..."
    
    mkdir -p /tmp/cann_download
    cd /tmp/cann_download
    
    case "$OS" in
        centos)
            PACKAGE="CANN-$CANN_VERSION-centos7.6-x86_64.tar.gz"
            ;;
        ubuntu)
            PACKAGE="CANN-$CANN_VERSION-ubuntu$OS_VERSION-x86_64.tar.gz"
            ;;
        openeuler)
            PACKAGE="CANN-$CANN_VERSION-openeuler20.03-x86_64.tar.gz"
            ;;
    esac
    
    print_info "正在下载 $PACKAGE..."
    wget -q --show-progress "$DOWNLOAD_URL/$PACKAGE"
    
    if [ $? -eq 0 ]; then
        print_info "下载成功"
    else
        print_error "下载失败，请检查网络连接"
        exit 1
    fi
}

extract_package() {
    print_info "解压安装包..."
    tar -xzf /tmp/cann_download/*.tar.gz -C /tmp/cann_download
    print_info "解压完成"
}

install_cann() {
    print_info "开始安装 CANN..."
    
    mkdir -p "$INSTALL_DIR"
    
    cp -rf /tmp/cann_download/CANN*/* "$INSTALL_DIR"/
    
    if [ $? -eq 0 ]; then
        print_info "安装成功"
    else
        print_error "安装失败"
        exit 1
    fi
}

configure_env() {
    print_info "配置环境变量..."
    
    ENV_FILE="/etc/profile.d/ascend.sh"
    
    cat > "$ENV_FILE" << EOF
export ASCEND_HOME=$INSTALL_DIR
export LD_LIBRARY_PATH=\$ASCEND_HOME/fwkacllib/lib64:\$ASCEND_HOME/driver/lib64:\$LD_LIBRARY_PATH
export PATH=\$ASCEND_HOME/fwkacllib/bin:\$ASCEND_HOME/toolkit/bin:\$PATH
export PYTHONPATH=\$ASCEND_HOME/fwkacllib/python/site-packages:\$PYTHONPATH
EOF
    
    chmod +x "$ENV_FILE"
    source "$ENV_FILE"
    
    print_info "环境变量配置完成"
}

verify_installation() {
    print_info "验证安装..."
    
    if [ -d "$INSTALL_DIR/fwkacllib" ] && [ -d "$INSTALL_DIR/driver" ]; then
        print_info "CANN 安装验证通过"
        print_info "版本: $CANN_VERSION"
        print_info "安装路径: $INSTALL_DIR"
        print_info ""
        print_info "请执行以下命令使环境变量生效:"
        print_info "  source /etc/profile"
        print_info ""
        print_info "或重新登录终端"
    else
        print_error "安装验证失败"
        exit 1
    fi
}

cleanup() {
    print_info "清理临时文件..."
    rm -rf /tmp/cann_download
    print_info "清理完成"
}

main() {
    echo ""
    echo "=========================================="
    echo "     CANN $CANN_VERSION 自动安装脚本"
    echo "=========================================="
    echo ""
    
    check_root
    check_os
    check_dependencies
    download_cann
    extract_package
    install_cann
    configure_env
    verify_installation
    cleanup
    
    echo ""
    echo "=========================================="
    echo "     CANN 安装完成!"
    echo "=========================================="
}

main "$@"