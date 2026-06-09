#!/bin/bash

set -e

INSTALL_DIR="/usr/local/Ascend"
ENV_FILE="/etc/profile.d/ascend.sh"

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
        print_info "使用: sudo ./uninstall.sh"
        exit 1
    fi
}

remove_files() {
    print_info "删除安装文件..."
    
    if [ -d "$INSTALL_DIR" ]; then
        rm -rf "$INSTALL_DIR"
        print_info "安装目录已删除"
    else
        print_warn "安装目录不存在"
    fi
}

remove_env() {
    print_info "删除环境变量配置..."
    
    if [ -f "$ENV_FILE" ]; then
        rm -f "$ENV_FILE"
        print_info "环境变量配置已删除"
    else
        print_warn "环境变量配置文件不存在"
    fi
}

main() {
    echo ""
    echo "=========================================="
    echo "       CANN 卸载脚本"
    echo "=========================================="
    echo ""
    
    check_root
    
    echo -n "确定要卸载 CANN 吗? [y/N]: "
    read -r confirm
    
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        print_info "取消卸载"
        exit 0
    fi
    
    remove_files
    remove_env
    
    echo ""
    echo "=========================================="
    echo "       CANN 卸载完成!"
    echo "=========================================="
    echo ""
    print_info "请重新登录终端以清除环境变量"
}

main "$@"